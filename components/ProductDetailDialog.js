import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Card,
  CardContent,
  CardMedia,
  Typography, Dialog, DialogContent, IconButton, Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { motion } from 'framer-motion';

const ProductDetailDialog = ({ product, open, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isFullscreen}
      PaperProps={{
        component: motion.div,
        initial: { scale: 0.1, opacity: 0 },
        animate: { scale: 1.1, opacity: 1 },
        exit: { scale: 0.3, opacity: 0 },
        transition: { duration: 0.5 },
        sx: {
          width: isFullscreen ? '100vw' : '80vw',
          height: isFullscreen ? '100vh' : '80vh',
          maxWidth: isFullscreen ? 'none' : '800px',
          maxHeight: isFullscreen ? 'none' : '90vh',
          borderRadius: isFullscreen ? '0' : '20px',
          overflow: 'hidden'

        },
      }}
    >
      <DialogContent sx={{ padding: '10px', position: 'relative' }}>
        {/* 嵌套网页可能因目标网站的安全限制失败。
        如果目标网页设置了 X-Frame-Options 或 CSP 限制，
        可以尝试代理服务或直接在失败时提示用户访问外部链接。 */}
        {/* <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <iframed
            src={product.webpageUrl} 
            title={product.name}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </Box> */}

        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 1,
            zIndex: 10,
          }}
        >
          <IconButton onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* product detail */}
        <Card sx={{
          maxWidth: '100%',
          margin: 0,
          mt: 3,
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
        }}>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={product.image}
              alt={product.name}
              sx={{
                borderRadius: '8px',
              }}
            />

            {isFullscreen && (
              <IconButton
                onClick={toggleFullscreen}
                sx={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
              >
                <FullscreenExitIcon />
              </IconButton>
            )}
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {product.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              ¥{product.price}
            </Typography>
            <Grid container spacing={1}>
              {product.des_images && product.des_images.map((imgSrc, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CardMedia
                    component="img"
                    image={imgSrc}
                    alt={`Product image ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>

            <Grid container justifyContent="center" spacing={2}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                アレルギー情報：{product.allergens}
              </Typography>
            </Grid>
          </CardContent>

        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
