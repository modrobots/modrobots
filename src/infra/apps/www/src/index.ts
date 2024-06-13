import { getStack } from '@pulumi/pulumi';
import { nextJsApp } from '@infra/pulumi/vercel';
import { dnsRecord } from '@infra/pulumi/cloudflare';
import { ProjectDomain, ProjectEnvironmentVariable } from '@pulumiverse/vercel';

const up = async () => {
    const stack = getStack();

    let domainName = undefined;
    if (stack === 'next') {
        domainName = 'next.modrobots.com';
    }
    else if (stack === 'production') domainName = 'modrobots.com';
    if (!domainName) throw new Error('Domain name not found');

    // Vercel setup
    const app = nextJsApp('mr', 'modrobots', 'web/apps/www');

    new ProjectDomain('vercel-mr-domain', {
        projectId: app.projectId,
        domain: domainName,
    });
    new ProjectEnvironmentVariable('vercel-mr-env-appdomain', {
        projectId: app.projectId,
        key: 'NEXT_PUBLIC_APP_DOMAIN',
        value: domainName,
        targets: stack === 'production' ? ['production'] : ['preview'],
    });
    new ProjectEnvironmentVariable('vercel-mr-env-emaildomain', {
        projectId: app.projectId,
        key: 'NEXT_PUBLIC_APP_EMAILDOMAIN',
        value: domainName,
        targets: stack === 'production' ? ['production'] : ['preview'],
    });

    if (stack === 'next') {
        dnsRecord('vercel-mr', 'next', 'cname.vercel-dns.com', 'CNAME', false);
    } else if (stack === 'production') {
        dnsRecord('vercel-mr', '@', '76.76.21.21', 'A', false);
    }
};

export default up;