const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js');

const wallet = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;


const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`Wallet balance is ${walletBalance}`);
    } catch (error) {
        console.error(error);
    }
}

const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromAirDropSignrature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        const latestBlockHash = await connection.getLatestBlockhash();
        let res = await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: fromAirDropSignrature,
        });
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}

const main = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

main();