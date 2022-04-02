import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

const monthlyCopePayroll = 50 * 10 ** 6;//17000 * 10 ** 6;
 
const key = []
async function theFunction(){
    try{
     // Connect to cluster
     const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
     const fromWallet = Keypair.fromSecretKey(new Uint8Array(key));
     // Generate a new wallet keypair and airdrop SOL
     // const fromWallet = Keypair.generate();
     // const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
 
     // Wait for airdrop confirmation
     // await connection.confirmTransaction(fromAirdropSignature);
 
     // Generate a new wallet to receive newly minted token
     const toWallet = new PublicKey("H43mgtPqpNSd2CJAuoRJUKr3huoDQyroqh556wbmjwTQ");
 
     // Create new token mint
     const mint = new PublicKey("8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh");
     // Get the token account of the fromWallet address, and if it does not exist, create it
     const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
         connection,
         fromWallet,
         mint,
         fromWallet.publicKey
     );
 
     // Get the token account of the toWallet address, and if it does not exist, create it
     const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet, true);
 
     // Transfer the new token to the "toTokenAccount" we just created
     let signature = await transfer(
         connection,
         fromWallet,
         fromTokenAccount.address,
         toTokenAccount.address,
         fromWallet.publicKey,
         Math.floor(monthlyCopePayroll * 12 / 365 / 24)
     );
     console.log(signature)
}
catch(err){
    console.log(err)
    setTimeout(async function(){
        theFunction()
    }, 1000 * 60 * 10)
}
}
setInterval(async function () {
   theFunction();
}, 1000 * 60 * 60);
theFunction();