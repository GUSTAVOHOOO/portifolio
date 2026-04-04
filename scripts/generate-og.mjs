import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#0A0A0F';
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Subtle gradient band across vertical center
const grad = ctx.createLinearGradient(0, HEIGHT / 2 - 80, 0, HEIGHT / 2 + 80);
grad.addColorStop(0, 'rgba(99,102,241,0)');
grad.addColorStop(0.5, 'rgba(99,102,241,0.08)');
grad.addColorStop(1, 'rgba(99,102,241,0)');
ctx.fillStyle = grad;
ctx.fillRect(0, HEIGHT / 2 - 80, WIDTH, 160);

// Accent underline
ctx.fillStyle = '#6366F1';
ctx.fillRect(0, 580, WIDTH, 3);

// "GM" in accent color
ctx.font = 'bold 72px sans-serif';
ctx.fillStyle = '#6366F1';
ctx.fillText('GM', 80, 280);

// "Studio" in white — measure "GM" width first
const gmWidth = ctx.measureText('GM').width;
ctx.font = '72px sans-serif';
ctx.fillStyle = '#FFFFFF';
ctx.fillText('Studio', 80 + gmWidth, 280);

// Tagline
ctx.font = '28px sans-serif';
ctx.fillStyle = '#A1A1AA';
ctx.fillText('Presença digital para empresas e empreendedores', 80, 340);

// Save
const buffer = canvas.toBuffer('image/png');
writeFileSync('public/og-image.png', buffer);
console.log('OG image created: public/og-image.png (' + WIDTH + 'x' + HEIGHT + ')');
