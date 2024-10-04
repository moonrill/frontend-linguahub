// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const config = Object.keys(process.env).filter(it => it.startsWith('DYNAMIC_ENV_')).reduce((acc,curr) => {
        acc[curr] = process.env[curr] ?? '';
        return acc;
    }, {} as {[key: string]: string});

    const configString = JSON.stringify(config);

    res.setHeader("Surrogate-Control", "no-store");
    res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Content-Type", "text/javascript");

    res.status(200).send(`window.serverEnv = ${configString};`)
}
