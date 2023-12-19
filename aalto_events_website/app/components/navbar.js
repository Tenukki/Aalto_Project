"use client"
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'

export default function BottomNav() {
    const [value, setValue] = useState(0);
    const router = useRouter()

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                router.push(newValue)
            }}
            sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 100 }}
        >
            <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction value="/liked" label="Liked" icon={<FavoriteIcon />} />
            <BottomNavigationAction value="/share" label="Share" icon={<QrCode2Icon />} />
        </BottomNavigation>
    );
}