import React from 'react';
import { useParams } from 'react-router-dom';

const CarDetails: React.FC = () => {
    const params = useParams<{stockId?: string}>();

    return (
        <h1>{params.stockId}</h1>
    );
};

export default CarDetails;
