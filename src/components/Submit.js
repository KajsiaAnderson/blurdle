import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/material/styles";
import { Paper } from '@mui/material'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button"
import { AppContext } from '../App'
import { top100Films } from '../moviesList';


const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
        paddingLeft: 20
    },
    "& .MuiInputLabel-outlined": {
        color: "gray"
    },
    "&.Mui-focused .MuiInputLabel-outlined": {
        color: "gray"
    },
    "& .MuiAutocomplete-inputRoot": {
        color: "gray",
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
            paddingLeft: 20
        },
        "& .MuiAutocomplete-input": {
            borderColor: "gray"
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray"
        }
    },
    "& .MuiSvgIcon-root": {
        color: "white"
    },
});


export default function Submit() {
    const { board, setBoard, currAttempt, setCurrAttempt, correctMovie } = useContext(AppContext)

    const [value, setValue] = useState(null);

    // const handleEnter = (e) => { if (e.key === 'Enter') { console.log(e.target.value); } }

    const handleSubmit = (event, stateVal) => {
        event.preventDefault();
        console.log(event);
        console.log(stateVal);
        console.log(stateVal.label);

        if (currAttempt.attempt > 5) return;
        if (stateVal.label === '') return;

        const newBoard = [...board]
        newBoard[currAttempt.attempt] = stateVal.label
        console.log('e', newBoard)


        setBoard(newBoard)
        setCurrAttempt({ ...currAttempt, attempt: currAttempt.attempt + 1 })
        console.log('newBoard', newBoard)
        setValue(null)


        if (newBoard[currAttempt.attempt] === correctMovie) {
            alert('you won')
        }
    };

    const skipHandler = (e) => {
        e.preventDefault()
        if (currAttempt.attempt > 5) return;

        const newBoard = [...board]
        newBoard[currAttempt.attempt] = 'skipped'
        setBoard(newBoard)
        setCurrAttempt({ ...currAttempt, attempt: currAttempt.attempt + 1 })
        console.log('skipBoard', newBoard)
        setValue(null)
    }

    return (
        <form onSubmit={(event) => handleSubmit(event, value)} className="guess-section">
            <StyledAutocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                value={value}
                onChange={(event, value) => setValue(value)}
                ListboxProps={{
                    className: "myCustomList"
                }}
                PaperComponent={({ children }) => (
                    <Paper style={{ background: "#212121", color: "white", border: "solid gray" }}>{children}</Paper>
                )}
                sx={{ width: 'auto' }}
                renderInput={(params) => <TextField
                    className='textField'
                    // onKeyDown={(e) => handleEnter(e)}
                    {...params}
                    label="Guess the movie"
                    sx={{ input: { color: 'white' } }} />}
            />
            <Stack display="flex" justifyContent="space-between" direction="row">
                <Button type="button" variant="outlined" onClick={skipHandler}
                    sx={{
                        borderRadius: 50,
                        color: "white",
                        borderColor: '#444',
                        margin: 1.5,
                        paddingInline: 4,
                        paddingBlock: 1,
                        transition: "transform 0.15s ease-in-out",
                        '&:hover': {
                            transform: "scale3d(1.05, 1.05, 1)",
                            backgroundColor: 'transparent',
                            borderColor: "white"
                        }
                    }}>
                    Skip
                </Button>
                <Button type="submit" variant="contained"
                    sx={{
                        borderRadius: 50,
                        color: "black",
                        backgroundColor: "#F5C518",
                        margin: 1.5,
                        paddingInline: 3,
                        paddingBlock: 1,
                        transition: "transform 0.15s ease-in-out",
                        '&:hover': {
                            transform: "scale3d(1.05, 1.05, 1)",
                            backgroundColor: '#F5C518'
                        },
                    }}>
                    Submit
                </Button>
            </Stack>
        </form>
    );
}
