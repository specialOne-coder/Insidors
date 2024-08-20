import 'module-alias/register';

import { displayInsidor } from "@utils/index";
import { getSolanaTokenBirth, getTokenBirthTime } from '@indexation/apis/births';


displayInsidor();

getTokenBirthTime("eth","0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2");
getSolanaTokenBirth("EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm")