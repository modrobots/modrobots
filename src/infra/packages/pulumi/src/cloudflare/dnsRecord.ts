import { Config, Input } from '@pulumi/pulumi';
import { Record } from '@pulumi/cloudflare';

export function dnsRecord(name: string, dnsName: Input<string>, value: Input<string>, type: 'CNAME' | 'TXT' | 'MX' | 'A', protect: boolean, priority?: number) {
    const config = new Config();
    const zoneId = config.requireSecret('zoneid');
    return new Record(name, {
        name: dnsName,
        zoneId,
        type,
        value,
        priority: priority ?? (type === 'MX' ? 10 : undefined),
    }, {
        protect,
    });
}
