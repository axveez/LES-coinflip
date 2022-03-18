use crate::*;

#[near_bindgen]
impl Contract {

    #[payable]
    pub fn nfts_mint(
        &mut self,
        token_num: usize,
        // token_ids: &mut [&str],
        token_ids: &mut [TokenId; 32],
        token_id: TokenId,
        metadata: &mut [TokenMetadata; 32],
        receiver_id: AccountId,
        // //we add an optional parameter for perpetual royalties
        perpetual_royalties: Option<HashMap<AccountId, u32>>,
    ) {
        if !self.enable_mint {
            env::panic_str("ended to mint due to nft numbers over 3500 or time outed of 24 hours.")
        }
        // if self.tokens_per_owner.contains_key(&receiver_id) {
        //     env::panic_str("this account already mint nfts");
        // }
        self.token_count = self.token_count + u128::try_from(token_num).unwrap();

        if self.token_count > 3500 {
            self.stop_mint();
            env::panic_str("stop mint due to over 3500 nfts");
        }
        // for token in token_ids {
        //     let token_id_clone: TokenId = token.to_string();
        //     let metadata_clone = metadata.clone();
        //     let receiver_id_clone: AccountId = receiver_id.clone();
        //     let perpetual_royalties_clone = perpetual_royalties.clone();
        //     // let metadata_duplicate = duplicate(metadata);

        //     self.nft_mint(token_id_clone, metadata_clone, receiver_id_clone, perpetual_royalties_clone);
        // }
        for i in 0..token_num {
            let token_id_clone: TokenId = token_ids[i].to_string();
            let metadata_clone = metadata[i].clone();
            let receiver_id_clone: AccountId = receiver_id.clone();
            let perpetual_royalties_clone = perpetual_royalties.clone();
            // let metadata_duplicate = duplicate(metadata);

            self.nft_mint(token_id_clone, metadata_clone, receiver_id_clone, perpetual_royalties_clone);
        }
    }
    #[payable]
    pub fn _nfts_mint(
        &mut self,
        token_num: u128,
        token_ids: &[TokenId; 32],
        // token_ids: &[TokenId],
        token_id: TokenId,
        metadata: TokenMetadata,
        receiver_id: AccountId,
        // //we add an optional parameter for perpetual royalties
        perpetual_royalties: Option<HashMap<AccountId, u32>>,
    ) {
        if !self.enable_mint {
            env::panic_str("ended to mint due to nft numbers over 3500")
        }
        // if self.tokens_per_owner.contains_key(&receiver_id) {
        //     env::panic_str("this account already mint nfts");
        // }
        self.token_count = self.token_count + token_num;
        let initial_storage_usage = env::storage_usage();
        let mut royalty = HashMap::new();

        if let Some(perpetual_royalties) = perpetual_royalties {
            assert!(perpetual_royalties.len() < 7, "Cannot add more than 6 perpetual royalty amounts");

            //iterate through the perpetual royalties and insert the account and amount in the royalty map
            for (account, amount) in perpetual_royalties {
                royalty.insert(account, amount);
            }
        }
        for token in token_ids {
            let token_id_clone = token.clone();
            let royalty_clone = royalty.clone();
            let receiver_id_clone = receiver_id.clone();
            
            let token = Token {
                //set the owner ID equal to the receiver ID passed into the function
                owner_id: receiver_id_clone,
                //we set the approved account IDs to the default value (an empty map)
                approved_account_ids: Default::default(),
                //the next approval ID is set to 0
                next_approval_id: 0,
                //the map of perpetual royalties for the token (The owner will get 100% - total perpetual royalties)
                royalty: royalty_clone,
            };
            assert!(
                self.tokens_by_id.insert(&token_id_clone, &token).is_none(),
                "Token already exists"
            );
            self.token_metadata_by_id.insert(&token_id_clone, &metadata);

            self.internal_add_token_to_owner(&token.owner_id, &token_id_clone);

            let nft_mint_log: EventLog = EventLog {
                // Standard name ("nep171").
                standard: NFT_STANDARD_NAME.to_string(),
                // Version of the standard ("nft-1.0.0").
                version: NFT_METADATA_SPEC.to_string(),
                // The data related with the event stored in a vector.
                event: EventLogVariant::NftMint(vec![NftMintLog {
                    // Owner of the token.
                    owner_id: token.owner_id.to_string(),
                    // Vector of token IDs that were minted.
                    token_ids: vec![token_id_clone.to_string()],
                    // An optional memo to include.
                    memo: None,
                }]),
            };
    
            // Log the serialized json.
            env::log_str(&nft_mint_log.to_string());
    
            //calculate the required storage which was the used - initial
            let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;
    
            //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
            refund_deposit(required_storage_in_bytes);
        }
    }
    #[payable]
    pub fn nft_mint(
        &mut self,
        token_id: TokenId,
        metadata: TokenMetadata,
        receiver_id: AccountId,
        //we add an optional parameter for perpetual royalties
        perpetual_royalties: Option<HashMap<AccountId, u32>>,
    ) {
        // if !self.enable_mint {
        //     env::panic_str("ended to mint due to nft numbers over 3500 or time outed of 24 hours.")
        // }
        // if self.tokens_per_owner.contains_key(&receiver_id) {
        //     env::panic_str("this account already mint nfts");
        // }
        // self.token_count = self.token_count + 1;

        //measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        // create a royalty map to store in the token
        let mut royalty = HashMap::new();

        // if perpetual royalties were passed into the function: 
        if let Some(perpetual_royalties) = perpetual_royalties {
            //make sure that the length of the perpetual royalties is below 7 since we won't have enough GAS to pay out that many people
            assert!(perpetual_royalties.len() < 7, "Cannot add more than 6 perpetual royalty amounts");

            //iterate through the perpetual royalties and insert the account and amount in the royalty map
            for (account, amount) in perpetual_royalties {
                royalty.insert(account, amount);
            }
        }

        //specify the token struct that contains the owner ID 
        let token = Token {
            //set the owner ID equal to the receiver ID passed into the function
            owner_id: receiver_id,
            //we set the approved account IDs to the default value (an empty map)
            approved_account_ids: Default::default(),
            //the next approval ID is set to 0
            next_approval_id: 0,
            //the map of perpetual royalties for the token (The owner will get 100% - total perpetual royalties)
            royalty,
        };

        //insert the token ID and token struct and make sure that the token doesn't exist
        assert!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists"
        );

        //insert the token ID and metadata
        self.token_metadata_by_id.insert(&token_id, &metadata);

        //call the internal method for adding the token to the owner
        self.internal_add_token_to_owner(&token.owner_id, &token_id);

        // Construct the mint log as per the events standard.
        let nft_mint_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftMint(vec![NftMintLog {
                // Owner of the token.
                owner_id: token.owner_id.to_string(),
                // Vector of token IDs that were minted.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo: None,
            }]),
        };

        // Log the serialized json.
        env::log_str(&nft_mint_log.to_string());

        //calculate the required storage which was the used - initial
        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
        refund_deposit(required_storage_in_bytes);
    }
    #[payable]
    pub fn stop_mint(&mut self) {
        self.enable_mint = false;
    }
    #[payable]
    pub fn start_mint(&mut self) {
        self.enable_mint = true;
    }
    #[payable]
    pub fn add_vip_address(&mut self, account_id: AccountId) {
        self.vip_addresses.push(account_id.to_string());
    }
    // pub fn is_vip(&mut self, account_id: String) -> bool {

    //     if self.vip_addresses.contains(&account_id) {
    //         return true;
    //     }
    //     return false;
    // }
    pub fn get_vip_addresses(&self) -> &Vec<String> {
        &self.vip_addresses
    }
}