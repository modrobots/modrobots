import { Config, getStack } from '@pulumi/pulumi';
import { nextJsApp } from '@infra/pulumi/vercel';
import { dnsRecord } from '@infra/pulumi/cloudflare';
import { ProjectDomain, ProjectEnvironmentVariable } from '@pulumiverse/vercel';
import { EmailRoutingRule } from '@pulumi/cloudflare/emailRoutingRule.js';
import { EmailRoutingAddress } from '@pulumi/cloudflare/emailRoutingAddress.js';
import { EmailRoutingSettings } from '@pulumi/cloudflare/emailRoutingSettings.js';

function emailRoute(name: string, from: string[], to: string) {
    const zoneId = new Config().requireSecret('zoneid');
    const accountId = new Config().requireSecret('cfaccountid');
    new EmailRoutingAddress('emailroutingaddress-' + name, {
        accountId: accountId,
        email: to,
    });
    new EmailRoutingSettings('emailroutingsettings-' + name, {
        zoneId,
        enabled: true,
        skipWizard: true,
    });
    from.forEach((fromEmail) => {
        new EmailRoutingRule('emailroute-' + name + '-' + fromEmail.substring(0, fromEmail.indexOf('@')), {
            name,
            zoneId,
            enabled: true,
            matchers: [{
                type: 'literal',
                field: 'to',
                value: fromEmail,
            }],
            actions: [{
                type: 'forward',
                values: [to],
            }],
        });
    });
}

const up = async () => {
    const stack = getStack();

    let domainName = undefined;
    if (stack === 'next') {
        domainName = 'next.modrobots.com';
    }
    else if (stack === 'production') domainName = 'modrobots.com';
    if (!domainName) throw new Error('Domain name not found');

    // Vercel setup
    const app = nextJsApp('mr', 'www', 'src/web/apps/www');

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

    if (stack === 'next') {
        dnsRecord('vercel-mr', 'next', 'cname.vercel-dns.com', 'CNAME', false);
    } else if (stack === 'production') {
        dnsRecord('vercel-mr', '@', '76.76.21.21', 'A', false);
        emailRoute('main-modrobots', [
            'aleksandar.toplek@modrobots.com',
            'contact@modrobots.com',
            'info@modrobots.com',
            'security@modrobots.com',
        ], 'aleksandar.toplek+modrobots@gmail.com');
    }
};

export default up;