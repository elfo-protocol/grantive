import { Provider, Wallet } from "@project-serum/anchor";
import { ENDPOINT } from "../app/src/lib/constants";
import { join } from 'path';
import { homedir} from 'os';
import * as fs from 'fs-extra';
import { Connection, Keypair } from "@solana/web3.js";

export const getProvider = async (): Promise<Provider> => {
    return new Provider(
      new Connection(ENDPOINT),
      new Wallet(await getKeyPair()),
      Provider.defaultOptions(),
    );
  }
  
export const getKeyPair = async (): Promise<Keypair> => {
    const id = await fs.readJSON(join(homedir(), '.config/solana/id.json'));
    const bytes = Uint8Array.from(id);
    return Keypair.fromSecretKey(bytes);
  }