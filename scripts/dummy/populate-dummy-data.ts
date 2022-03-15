import { initCreator } from '../../app/src/lib/grantive/creator'
import {data} from './data'
import { getProvider as getRootProvider } from '../root-provider';
import { Transaction, Keypair, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import { Provider, Wallet } from '@project-serum/anchor';
import {
    createAssociatedTokenAccountInstruction,
    createMintToInstruction,
    getAssociatedTokenAddress,
} from "@solana/spl-token";
import { DEFAULT_USDC_MINT } from '../../app/src/lib/constants';
import { createPost } from '../../app/src/lib/grantive/post';
import fetch from 'node-fetch';
import * as fs from 'fs-extra';
import {pipeline} from 'stream';
import {promisify} from 'node:util'
import {join, extname} from 'path';

const streamPipeline = promisify(pipeline);
let rootProvider: Provider;

const populate = async() => {
    rootProvider = await getRootProvider(); 
    for (const c of data) {
        const wallet = await getWalletWithFunds();
        const amount = Math.floor(Math.random() * (20 - 10 + 1) + 10);

        // adding the creator
        await initCreator(c.name, c.description, amount, await blobUrltoBase64(c.img), wallet); 
        
        console.log("Creator added: " + c.name);
        
        // adding posts
        const posts = c.posts.reverse();
        for (const p of posts) {
            let content = '';
            // <p>This is good content</p><p><br></p><p>This is awesome content</p><iframe class="ql-video" allowfullscreen="true" src="https://www.youtube.com/embed/IYnLCUPfTFE?showinfo=0" frameborder="0"></iframe><p><br></p>
            for (const para of p.paragraphs) {
                content = content + `<p>${para}</p><p><br></p>`
            }
            if(p.video !== "") {
                const videoId = p.video.replace("https://www.youtube.com/watch?v=", "").trim();
                content = content + `<iframe class="ql-video" allowfullscreen="true" src="https://www.youtube.com/embed/${videoId}?showinfo=0" frameborder="0"></iframe><p><br></p>`
            }
            await createPost(p.title, content, p.subscriberOnly, wallet);
            console.log("   Post added: " + p.title)
        }
    }

}

const getWalletWithFunds =  async(): Promise<Wallet> => {
    const keyPair = Keypair.generate();
    await rootProvider.connection.requestAirdrop(keyPair.publicKey, 1000 * LAMPORTS_PER_SOL);
    const usdcAccount = await createAssocciatedTokenAccount(rootProvider, DEFAULT_USDC_MINT, keyPair.publicKey);
    await mintUSDC(rootProvider, DEFAULT_USDC_MINT, usdcAccount, rootProvider.wallet.publicKey, 5000 * Math.pow(10, 6));
    return new Wallet(keyPair);
}

const createAssocciatedTokenAccount = async (
    provider: Provider,
    mint: PublicKey,

    owner: PublicKey,
): Promise<PublicKey> => {
    const associatedAccount = await getAssociatedTokenAddress(mint, owner);

    const tx = new Transaction(
        {
            feePayer: provider.wallet.publicKey,
            recentBlockhash: (await provider.connection.getLatestBlockhash()).blockhash,
        }
    );
    tx.add(
        createAssociatedTokenAccountInstruction(
            provider.wallet.publicKey,
            associatedAccount,
            owner,
            mint
        )
    );
    await provider.wallet.signTransaction(tx);

    await provider.send(tx);
    return associatedAccount;
}

export async function mintUSDC(
    provider: Provider,
    mint: PublicKey,
    destination: PublicKey,
    mint_authority: PublicKey,
    amount: number,
) {
    const instructions = await createMintToInstruction(
        mint,
        destination,
        mint_authority,
        amount,
    );

    const tx = new Transaction({
        feePayer: provider.wallet.publicKey,
        recentBlockhash: (await provider.connection.getLatestBlockhash()).blockhash,
    }).add(instructions);

    await provider.wallet.signTransaction(tx);
    await provider.send(tx);
}

const blobUrltoBase64 = (blobUrl:string): Promise<string> => new Promise((resolve) => {
    const fileName = join(__dirname, '..', '..', 'temp', `${new URL(blobUrl).pathname.split('/').pop() as string}`);
    const exists = fs.existsSync(fileName);
    if(!exists) {
        fetch(blobUrl).then((res) => {
            const file = fs.createWriteStream(fileName);
            streamPipeline(res.body, file).then(() => {
                const contents = fs.readFileSync(fileName, {encoding: 'base64'});
                resolve(`data:image/${extname(fileName)};base64,` + contents);
            });
        })
    } else {
        const contents = fs.readFileSync(fileName, {encoding: 'base64'});
        resolve(`data:image/${extname(fileName)};base64,` + contents);
    }
  })

populate()
.then(() => {
    console.log("Done")
})
.catch(e => {
    console.log(e)
})

// blobUrltoBase64(
//     "https://static.wixstatic.com/media/0fec9d_4e0a46dc6cb44b66943abd65b354f55e~mv2_d_2246_3370_s_2.jpeg/v1/crop/x_0,y_0,w_2246,h_2330/fill/w_414,h_430,al_c,q_80,usm_0.33_1.00_0.00,enc_auto/Attachment_1551280521.jpeg"
// ).then(d => console.log(d)).catch(e => {
//         console.log(e)
//     })