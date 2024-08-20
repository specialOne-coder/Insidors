import 'module-alias/register';

import { displayInsidor } from "@utils/index";
import { indexAll } from '@indexation/index';



async function main() {
    displayInsidor();
    await indexAll("eth:0xb23d80f5fefcddaa212212f028021b41ded428cf");
    // await indexAll("solana:A3eME5CetyZPBoWbRUwY3tSe25S6tb18ba9ZPbWk9eFJ");
    // let evmtoken = await getEvmTokenBirth("eth", "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2");
    // let soltoken = await getSolanaTokenBirth("EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm")
    // console.log({ evmtoken });
    // console.log({ soltoken });

}

main().then().catch(console.error);