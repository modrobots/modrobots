# Allows PlatformIO to upload directly to MOD Robots micro OTA
#
# Add the following lines to your platformio.ini
# extra_scripts = platformio_upload.py
# upload_protocol = custom
# custom_upload_url = http://<IP_ADDRESS>

import requests
import hashlib
from urllib.parse import urlparse
import time
from requests.auth import HTTPDigestAuth
Import("env")

try:
    from requests_toolbelt import MultipartEncoder, MultipartEncoderMonitor
    from tqdm import tqdm
except ImportError:
    env.Execute("$PYTHONEXE -m pip install requests_toolbelt")
    env.Execute("$PYTHONEXE -m pip install tqdm")
    from requests_toolbelt import MultipartEncoder, MultipartEncoderMonitor
    from tqdm import tqdm

def on_upload(source, target, env):
    firmware_path = str(source[0])

    auth = None
    upload_url_compatibility = env.GetProjectOption('custom_upload_url')
    upload_url = upload_url_compatibility.replace("/update", "")

    with open(firmware_path, 'rb') as firmware:
        md5 = hashlib.md5(firmware.read()).hexdigest()

        parsed_url = urlparse(upload_url)
        host_ip = parsed_url.netloc

        start_url = f"{upload_url}/ota/start?mode=fr&hash={md5}"

        start_headers = {
            'Host': host_ip,
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0',
            'Accept': '*/*',
            'Accept-Language': 'en-US;q=0.7,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            'Referer': f'{upload_url}/update',
            'Connection': 'keep-alive'
            }
        
        doUpdate = requests.get(start_url, headers=start_headers)

        if doUpdate.status_code != 200:
            print("start-request faild " + str(doUpdate.status_code))
            return

        firmware.seek(0)
        encoder = MultipartEncoder(fields={
            'MD5': md5,
            'firmware': ('firmware', firmware, 'application/octet-stream')}
        )

        bar = tqdm(desc='Upload Progress',
                   total=encoder.len,
                   dynamic_ncols=True,
                   unit='B',
                   unit_scale=True,
                   unit_divisor=1024
                   )

        monitor = MultipartEncoderMonitor(encoder, lambda monitor: bar.update(monitor.bytes_read - bar.n))

        post_headers = {
            'Host': host_ip,
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0',
            'Accept': '*/*',
            'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            'Referer': f'{upload_url}/update',
            'Connection': 'keep-alive',
            'Content-Type': monitor.content_type,
            'Content-Length': str(monitor.len),
            'Origin': f'{upload_url}'
        }
        
        response = requests.post(f"{upload_url}/ota/upload", data=monitor, headers=post_headers, auth=auth)
        
        bar.close()
        time.sleep(0.1)
        
        if response.status_code != 200:
            message = "\nUpload faild.\nServer response: " + response.text
            tqdm.write(message)
        else:
            message = "\nUpload successful.\nServer response: " + response.text
            tqdm.write(message)

            
env.Replace(UPLOADCMD=on_upload)