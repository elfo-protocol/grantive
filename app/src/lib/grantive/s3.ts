import { CreatorData } from './creator';
import axios from 'axios';
import { PostContentSerializable } from './post';

class S3Service {
    url: string;
    cdn: string;

    constructor() {
        this.url = 'https://grantive.elfo.cc:5000';
        this.cdn = 'https://grantive-cdn.elfo.cc/';
    }

    async saveCreatorData(data: CreatorData): Promise<string> {
        return this.putJsonString(JSON.stringify(data));
    }

    async getCreatorData(path: string): Promise<CreatorData | undefined> {
        const result = await axios.get(this.cdn.concat(path), {});
        return result.data as CreatorData;
    }

    async savePostData(content: PostContentSerializable): Promise<string> {
        return this.putJsonString(JSON.stringify(content));
    }

    async getPostData(path: string): Promise<PostContentSerializable> {
        const result = await axios.get(this.cdn.concat(path), {});
        return result.data as PostContentSerializable;
    }

    private async putJsonString(data: string): Promise<string> {
        const { url } = await fetch(this.url.concat('/get-upload-url')).then(
            (res) => res.json()
        );
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: data,
        });
        return url.split('?')[0].split('/').pop();
    }
}

const s3service = new S3Service();
export default s3service;
