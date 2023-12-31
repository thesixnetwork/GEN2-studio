import { Button, Tooltip } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

interface MyComponentProps {
    NextPage: string;
    BorderRadius: number;
    FontSize: number;
    TextTitle: string;
}

export default function NextPageButton(props: MyComponentProps) {
    return (
        <Tooltip title='Go to next page'>
            <Link to={`${props.NextPage}`} >
                <Button variant="outlined"
                    style={{
                        borderRadius: `${props.BorderRadius}px`,
                        color: 'white',
                        borderColor: 'white',
                        padding: "5px 5px",
                        fontSize: `${props.FontSize}px`,
                    }}>{props.TextTitle}</Button>
            </Link>
        </Tooltip>

    )
}