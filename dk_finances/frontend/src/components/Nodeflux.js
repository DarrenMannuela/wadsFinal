const ACCESS_KEY = process.env.REACT_APP_NODEFLUX_ACCESS_KEY
const SECRET_KEY = process.env.REACT_APP_NODEFLUX_SECRET_KEY
const proxyServer = process.env.REACT_APP_PROXY_SERVER

export const NodefluxAuth = async () => {
    return await fetch(proxyServer + "/api/nodeflux/auth", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "access_key": ACCESS_KEY,
            "secret_key": SECRET_KEY
        })
    })
        .then(data => {
            // console.log(JSON.parse(JSON.stringify(data)))
            return data.json()
        })
        .then(auth => {
            // console.log(JSON.parse(auth))
            const AUTH = JSON.parse(auth)
            const DATE = AUTH.headers['x-nodeflux-timestamp'].slice(0, 8)
            const TOKEN = AUTH.token
            return {
                'authentication': `NODEFLUX-HMAC-SHA256 Credential=${ACCESS_KEY}/${DATE}/nodeflux.api.v1beta1.ImageAnalytic/StreamImageAnalytic, SignedHeaders=x-nodeflux-timestamp, Signature=${TOKEN}`,
                'timestamp': AUTH.headers['x-nodeflux-timestamp']
            }
        })
        .catch((err) => console.error(err))
}

export const NodefluxOcrKtp = async (auth = null, image) => {
    let nodeflux_auth;
    if (auth) {
        nodeflux_auth = {
            'authentication': auth.authentication,
            'timestamp': auth.timestamp
        }
    } else {
        nodeflux_auth = await NodefluxAuth();
    }
    return await fetch(proxyServer + "/api/nodeflux/ocr-ktp", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': nodeflux_auth.authentication,
            'x-nodeflux-timestamp': nodeflux_auth.timestamp
        },
        body: JSON.stringify({
            "images": image
        })
    })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(JSON.parse(result));
            const res = JSON.parse(result)
            return {"response": res, "authentication": nodeflux_auth.authentication, "timestamp": nodeflux_auth.timestamp}
        })
        .catch((err) => console.log(err))
}