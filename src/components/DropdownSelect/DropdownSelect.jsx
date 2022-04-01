import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function DropdownSelect({ label, name, options, onChange }) {
    const [selection, setSelection] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = e => {
        setSelection(e.target.value);
        onChange(e);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className='dropdown-select-menu'>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="drop-down-select-label">{label}</InputLabel>
                <Select
                    labelId='drop-down-select-label'
                    name={name}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={selection}
                    label={label}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options?.map(option => 
                        <MenuItem value={Object.values(option)[0]} key={Object.values(option)[0]}>{Object.values(option)[0]}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    );
}