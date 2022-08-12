import { $fetch } from 'ohmyfetch'

import bip from 'bip39';
import core from "@elrondnetwork/elrond-core-js";

const riddleSolver = (mnemonic) => {
  bip.wordlists.english.forEach(async (word) => {
    const mnemonicTest = mnemonic.replace('$word', word)
    const mnemonicValid = bip.validateMnemonic(mnemonicTest);
    
    if (mnemonicValid) { 
      let account = new core.account();

      await account.loadFromMnemonic(mnemonicTest)

      const { data } = await $fetch(`https://gateway.elrond.com/address/${account.address()}/transactions`);
  
      console.log(word, account.address(), data.transactions)

      if (data.transactions.length > 0) {
        console.log(`${word} is the answer!`)

        return;
      }
    }
  })
}

riddleSolver('know family culture begin bring human foam enter $word switch change mirror') // From that which comes within itself, it builds its table on my shelf
riddleSolver('purity wire please better mixture antenna betray $word dutch hen traffic glow') // _ _ _ _ _ for the Dwarf-lords in their halls of stone
riddleSolver('battle brave come phone bachelor subway unknown media claw venture check $word') // She's a 10 but needs a crypto top up first

