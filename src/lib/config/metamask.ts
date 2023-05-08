import { PUBLIC_METAMASK_ADDRESS } from '$env/static/public';
import { toBigInt } from 'ethers';

const transactionParameters = {
	gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
	to: PUBLIC_METAMASK_ADDRESS, // Required except during contract publications.
	from: '', // must match user's active address.
	value: toBigInt(0), // Only required to send ether to the recipient from the initiating external account.
};

export { transactionParameters };
