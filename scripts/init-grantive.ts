import { Program, Provider } from "@project-serum/anchor";
import * as anchor from '@project-serum/anchor';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { GRANTIVE_PROGRAM_ID } from "../app/src/lib/constants";
import { idl } from "../app/src/types/idl";
import { Grantive } from "../target/types/grantive";
import { getProvider } from "./root-provider";

const utf8 = anchor.utils.bytes.utf8;

const init = async () => {
    // init protocol
  const provider = await getProvider();
  const program = await getProgram(provider);

  const [grantiveState] = await PublicKey.findProgramAddress(
    [utf8.encode('grantive_state')],
    program.programId,
  );

  await program.rpc.initialize({
    accounts: {
      authority: provider.wallet.publicKey,
      grantiveState,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId
    }
  });

  console.log("Grantive Initialized.");
  console.log("Grantive state: ", grantiveState.toBase58());
}

const getProgram = async (provider: Provider): Promise<Program<Grantive>> => {
  return new Program<Grantive>(idl as Grantive, GRANTIVE_PROGRAM_ID, provider);
}



init().then(() => console.log("Done")).catch(e => {
  console.log(e);
})