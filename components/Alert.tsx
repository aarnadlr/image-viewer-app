import React, { useState, useEffect } from 'react';

interface Props {
    msg: string;
    type: string;
}

export default function Alert({ msg, type }: Props) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (msg) {
            setShow(true);
            setInterval(() => {
                setShow(false);
            }, 2000);
        }
    }, [msg]);
    return <>{show && <div className={`alert alert-${type}`}>{msg}</div>}</>;
}
