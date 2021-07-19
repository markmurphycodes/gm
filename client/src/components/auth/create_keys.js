import React from 'react';
import { Button } from "@material-ui/core";
import { getKeysWithSignature } from "../utils/clientKeys";


export const CreateKeys = (secretMessage) => {

    return (
        <>
        <Button onClick={getKeysWithSignature(secretMessage)}>Generate Keys</Button>
        </>
    )

}
