import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { CreatorData } from './creator';
import axios from 'axios';

const IPFS_URL = 'http://localhost:5001';
// const IPFS_PATH = 'ipfs';

// const authHeader = 'Basic '.concat(
//     new Buffer([
//         process.env.REACT_APP_INFURA_IPFS_PROJECT,
//         process.env.REACT_APP_INFURA_IPFS_SECRET,
//     ]).toString('base64')
// );

class IpfsService {
    client: IPFSHTTPClient;
    decorder: TextDecoder;

    constructor() {
        this.client = create({
            url: IPFS_URL,
        });
        this.decorder = new TextDecoder();
    }

    async saveCreatorData(data: CreatorData): Promise<string> {
        const created = await this.client.add(JSON.stringify(data));
        return created.path;
    }

    async getCreatorData(path: string): Promise<CreatorData | undefined> {
        const result = await axios.post(
            IPFS_URL.concat('/api/v0/cat').concat('?arg=').concat(path),
            null,
            {}
        );
        return result.data as CreatorData;
    }

    async savePostData(contentHtml: string): Promise<string> {
        const created = await this.client.add(JSON.stringify(contentHtml));
        return created.path;
    }

    async getPostData(path: string): Promise<string> {
        const result = await axios.post(
            IPFS_URL.concat('/api/v0/cat').concat('?arg=').concat(path),
            null,
            {}
        );
        return result.data as string;
    }
}

const ipfsService = new IpfsService();
export default ipfsService;
