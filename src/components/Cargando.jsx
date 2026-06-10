import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const Cargando = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f7f4ee',
                gap: 4,
            }}
        >
            <motion.img
                src="/logo.png"
                alt="Happy Home & Goods"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ height: 160 }}
            />

            {/* 3 puntos con fade escalonado */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                style={{ display: 'flex', gap: 10 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.25, 1, 0.25], scale: [0.6, 1.3, 0.6] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            delay: i * 0.2,
                            ease: 'easeInOut',
                        }}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: i === 1 ? '#FF6A00' : '#e85500',
                        }}
                    />
                ))}
            </motion.div>
        </Box>
    );
};

export default Cargando;
