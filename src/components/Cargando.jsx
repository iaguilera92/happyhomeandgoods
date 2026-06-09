import React from 'react';
import { Box, Typography } from '@mui/material';
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
                gap: 3,
            }}
        >
            <motion.img
                src="/logo.png"
                alt="Happy Home & Goods"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ height: 110 }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{ display: 'flex', gap: 8 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                        }}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: ['#1B83CC', '#017458', '#FF6A00'][i],
                        }}
                    />
                ))}
            </motion.div>
        </Box>
    );
};

export default Cargando;
