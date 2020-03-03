import axios from 'axios';

const tokenApiUrl = process.env.REACT_APP_TOKEN_API_URL || 'https://token.ambrosus.com';
const baseApiUrl = process.env.REACT_APP_API_ENDPOINT;
const API = () => {
    const api = axios.create({
        baseURL: baseApiUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    function handleNotFound(err) {
        if (err) {
            console.error(err);
        }

        window
            .location
            .replace('/notfound');
    }

    api
        .interceptors
        .response
        .use(response => {
            if (response.data) {
                return response.data;
            }

            return response;
        }, error => {
            handleNotFound(error);
        },);

    return api;
};

const getBlocks = (params = {}) => {
    return API().get('blocks', {params});
};

const getBlock = hashOrNumber => {
    return API().get(`blocks/${hashOrNumber}`);
};

const getBlockTransactions = (hashOrNumber, params = {}) => {
    return API().get(`blocks/${hashOrNumber}/transactions`, {params});
};

const getAccount = addr => {
    return API().get(`accounts/${addr}`);
};

const getAtlas = addr => {
    return API().get(`atlases/${addr}`);
};

const getApollo = addr => {
    return API().get(`apollos/${addr}`);
};

const getApolloRewards = (addr, params) => {
    const url = `apollos/${addr}/rewards`;
    return API().get(url, {params});
};

const getTransaction = hash => {
    return API().get(`transactions/${hash}`);
};

const getTransactions = (params = {}) => {
    const {type} = params;
    if (type) {
        delete params.type;
    }
    const url = `transactions${type
        ? `/types/${type}`
        : ''}`;
    return API().get(url, {params});
};

const getTransactionEvent = hash => {
    return API().get(`transactions/${hash}/event`);
};

const getAccounts = (params = {}) => {
    return API().get(`accounts`, {params});
};

const getApollos = (params = {}) => {
    return API().get(`apollos`, {params});
};

const getAtlases = (params = {}) => {
    return API().get(`atlases`, {params});
};

const getAccountTx = (addr, params = {}) => {
    return API().get(`accounts/${addr}/transactions`, {params});
};

const getBundle = bundleId => {
    return API().get(`bundles/${bundleId}`);
};

const getBundleAssets = (bundleId, params = {}) => {
    return API().get(`bundles/${bundleId}/assets`, {params});
};

const getBundleEvents = (bundleId, params = {}) => {
    return API().get(`bundles/${bundleId}/events`, {params});
};

const getBundleWithEntries = bundleId => {
    return axios.all([getBundle(bundleId), getBundleAssets(bundleId), getBundleEvents(bundleId)]).then(axios.spread((bundle, assets, events) => {
        return {bundle, assets, events};
    }),);
};

const searchItem = term => {
    return API().get(`search/${term}`);
};

const getBundles = (params = {}) => {
    return API().get(`bundles?cursor`, {params});
};

const getInfo = () => {
    return API().get(`info/`);
};

const getToken = () => {
    return axios
        .get(tokenApiUrl)
        .then(({data}) => data.data);
};

const getTokenHistory = () => {
    return axios
        .get(tokenApiUrl + '/history')
        .then(({data}) => data.data);
};

const followTheLink = (time, address) => {
    const link = `${baseApiUrl}/transactions/address/csv?`;
    if (time !== "") {
        const date = new Date(time) / 1000;
        // console.log("time", date)
        // console.log("link", {link})
        // console.log("time", `${link}address=${address}&date=${date}`)

        window.open(`${link}address=${address}&date=${date}`, '_self');
    }
}

export default {
    API : API(),
    getBlocks,
    getBlockTransactions,
    getTransactions,
    getAccounts,
    getApollos,
    getApollo,
    getAtlas,
    getAtlases,
    getApolloRewards,
    getInfo,
    getToken,
    getAccountTx,
    getBlock,
    getAccount,
    getTransaction,
    getTransactionEvent,
    getBundles,
    getBundle,
    getBundleAssets,
    getBundleEvents,
    getBundleWithEntries,
    searchItem,
    getTokenHistory,
    followTheLink
};
