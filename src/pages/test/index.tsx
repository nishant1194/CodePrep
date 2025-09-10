// pages/test/index.tsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

const TestPage = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  
  return (
    <>
      <h1>Recoil Test Page</h1>
      <p>Modal is {modalState.isOpen ? 'Open' : 'Closed'}</p>
    </>
  );
};

export default TestPage;
