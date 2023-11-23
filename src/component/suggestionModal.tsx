import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    // useDisclosure,
    Spacer,
    Spinner,
    InputGroup,
    InputLeftElement,
    Box,
    Input,
    Text,
    Flex,
    // VStack,
    Button
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
  import React, { useEffect, useRef, useState, useCallback } from "react";
  
  // import { getSchemaByAddress, getSchemaByCodeAddr, getSchemaByCodeAddr2 } from "@/service/nftmngr";
  // import { Clickable } from "./Clickable";
  // import { _LOG } from "@/utils/log_helper";
  // import * as React from 'react';
  
  type SearchResult = {
    type: "address" | "tx" | "block" | "schema" | "contract";
    value: any;
    icon: React.ReactNode;
  };
  
  type ResultContract = {
    originContractAddress: string;
    schemaCodes: any;
  };
  
  type ResultSchema = {
    originContractAddress: string;
    schemaCodes: string;
  };
  
  
  const SearchModal = ({
    onOpen,
    isOpen,
    onClose,
  }: {
    onOpen: () => void;
    isOpen: boolean;
    onClose: () => void;
  }) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSchema, setIsSchema] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isContract, setIsContract] = useState(false);
    const [resultContract, setResultContract] = useState<ResultContract[]>([]);
    const [resultSchema, setResultSchema] = useState<ResultSchema[]>([]);
    const initialRef = useRef(null);
    const finalRef = useRef(null);
  
    const handleSearch = useCallback(async () => {
      const _searchResults: SearchResult[] = [];
      console.log(resultContract);
      
      // Validate the input
      const isAddress = validateAddress(searchInput);
      const isTx = validateTxHash(searchInput);
      const isBlock = await validateBlock(searchInput);
      const isContractByAddress = await validateContract(searchInput);
    
      if (isAddress) {
        setIsSchema(false);
        setIsContract(false);
        _searchResults.push({
          type: "address",
          value: searchInput,
          icon: <FaFingerprint />,
        });
      } else if (isTx) {
        setIsSchema(false);
        setIsContract(false);
        _searchResults.push({
          type: "tx",
          value: searchInput,
          icon: <FaHashtag />,
        });
      } else if (isBlock) {
        setIsSchema(false);
        setIsContract(false);
        _searchResults.push({
          type: "block",
          value: searchInput,
          icon: <FaLayerGroup />,
        });
      } else if (isContractByAddress) {
        setIsContract(true);
        setIsSchema(false);
    
        // Fetch contract schema based on address
        const _ContractSchema = await fetch(`/api/getSchemaCodebyContract?input=${searchInput}`);
        const schemaByContract = await _ContractSchema.json();
    
        setResultContract(schemaByContract);
      } else {
        // Fetch schema information
        const _Schema = await fetch(`/api/getSchemaCode?input=${searchInput}`);
        const schemaData = await _Schema.json();
    
        setIsSchema(true);
        setIsContract(false);
        setResultSchema(schemaData);
      }
  
      setIsLoading(false);
      setSearchResults(_searchResults);
    }, [searchInput]);
  
  
    useEffect(() => {
      if (searchInput !== "") {
        setIsLoading(true); // Set loading state to true immediately
    
        // Wait for 500ms before performing search
        const timeout = setTimeout(() => {
          handleSearch();
        }, 500);
    
        return () => clearTimeout(timeout);
      }
    }, [searchInput]);
    
    return (
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent maxW={{ base: "sm", md: "lg", lg: "2xl" }} >
          <ModalHeader borderBottom={"1px solid"} borderColor={"blackAlpha.100"}>
            <InputGroup size="lg">
              <InputLeftElement>
                <Box color={"dark"}>
                  {/* <FaSearch /> */}
                </Box>
              </InputLeftElement>
              <Input
                variant="ghost"
                placeholder={"Search by Address(6x) / Txn Hash / Block / Schema / Contract(0x)"}
                value={searchInput}
                onClick={onOpen}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && isLoading && (
                <ModalBody>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='md'
                  />
                </ModalBody>)
              }
            </InputGroup>
          </ModalHeader>
          {searchInput && !isSchema && (
            <ModalBody>
              {sugestion.map((result) => (
                <Flex direction="column" key={result.value} gap={1}>
                  <motion.div>
                    <Text fontSize="xs" fontWeight="bold" color="dark">
                      {result.type.toUpperCase()}
                    </Text>
                    <Flex
                      bgColor={"lightest"}
                      borderRadius={6}
                      p={4}
                      // as={LinkComponent}
                      // href={`/${result.type}/${result.value}`}
                      _hover={{ bgColor: "light" }}
                      gap={2}
                      alignItems="center"
                      onClick={onClose}
                    >
                      <Box color="dark">{result.icon}</Box>
                      <Box overflow="hidden">
                        <Text
                          fontSize="md"
                          color="dark"
                          _hover={{ color: "darkest" }}
                        >
                          {result.value}
                        </Text>
                      </Box>
                      <Spacer />
                      <Box color="dark">
                        <motion.div
                          initial={{
                            x: -10,
                            opacity: 0,
                          }}
                          animate={{
                            x: 0,
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                        >
                          {/* <FaArrowRight /> */}
                        </motion.div>
                      </Box>
                    </Flex>
                  </motion.div>
                </Flex>
              ))}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    );
  };
  
  export default SearchModal;
  