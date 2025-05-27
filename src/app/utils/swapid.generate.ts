import { ProposalService } from "../modules/proposal/proposal.service";


async function swapIdGenerate (){
    let order_id;
    let exists = true;
    while (exists) {
      order_id = `ID${Math.floor(0 + Math.random() * 999999999)}`;
      const existingOrder = await ProposalService.getAProposalFindByUniqueSwapId(order_id);
      exists = existingOrder;
    }
    return order_id;
};

export default swapIdGenerate;