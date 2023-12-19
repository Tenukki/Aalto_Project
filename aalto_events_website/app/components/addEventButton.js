"use client"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useRouter, useSearchParams } from 'next/navigation'

export default function AddEventButton(props) {

  const router = useRouter()

  const navigateTo = () => {
    router.push(`/modify?newEvent=true`)
  }

  return (
    <div className='fixed bottom-16 right-3'>
      <Fab color="primary" onClick={navigateTo} {...props} className="bg-blue-600" aria-label="add">
        <AddIcon />
      </Fab>
    </div>

  );
}