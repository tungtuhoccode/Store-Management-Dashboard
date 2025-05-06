import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MyPagination({ currentPage, totalPages }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', value);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };
    return (
        <div>
            <Stack spacing={2} className="mt-4 flex justify-center">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#65a30d',
                            borderColor: '#65a30d',
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#65a30d !important',
                            color: 'white',
                        },
                        '& .Mui-selected:hover': {
                            backgroundColor: '#65a30d !important',
                        }
                    }}
                />
            </Stack>
        </div>
    )
}