import React from 'react';
import { ArrowLeft, ShoppingCart, Star, Beaker, ShieldCheck, Clock } from 'lucide-react';
import { getKits } from '../data/shopData';

export default function ShopPage({ onBack, onCheckout }) {
  const kits = getKits();

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>
          <ArrowLeft size={20} color="#6d4ca6" />
        </button>
        <h1 style={styles.headerTitle}>유전자 분석 키트</h1>
        <div style={{width: 40}}></div>
      </div>

      <div style={styles.content}>
        <div style={styles.heroSection}>
          <span style={styles.heroTag}>프리미엄 유전자 검사</span>
          <h2 style={styles.heroTitle}>집에서 간편하게<br />아이의 잠재력을 발견하세요</h2>
          <p style={styles.heroDesc}>침 한 방울로 850+개 유전적 특성을 분석하고<br />초개인화된 LifeUp 코칭을 받아보세요.</p>
        </div>

        <div style={styles.featuresRow}>
          <div style={styles.featureItem}>
            <div style={styles.iconCircle}><Beaker size={16} /></div>
            <span>안전한 타액채취</span>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.iconCircle}><ShieldCheck size={16} /></div>
            <span>미국 CLIA 인증</span>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.iconCircle}><Clock size={16} /></div>
            <span>결과 2주 소요</span>
          </div>
        </div>

        <div style={styles.productList}>
          {kits.map((kit) => (
            <div 
              key={kit.id} 
              style={{
                ...styles.kitCard,
                border: kit.popular ? '2px solid #6d4ca6' : '1px solid rgba(183,148,244,0.2)'
              }}
            >
              {kit.popular && <div style={styles.popularBadge}>👑 BEST SELLER</div>}
              
              <div style={styles.tagRow}>
                {kit.tags.map(tag => (
                  <span key={tag} style={{...styles.tag, color: kit.color, background: `${kit.color}15`}}>
                    {tag}
                  </span>
                ))}
              </div>

              <h3 style={styles.kitTitle}>{kit.title}</h3>
              <p style={styles.kitDesc}>{kit.description}</p>
              
              <div style={styles.priceRow}>
                <span style={styles.originalPrice}>{kit.originalPrice.toLocaleString()}원</span>
                <span style={styles.price}>{kit.price.toLocaleString()}원</span>
              </div>

              <button onClick={() => onCheckout(kit)} style={{...styles.buyBtn, background: kit.color}}>
                <ShoppingCart size={16} /> 이 키트로 시작하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#faf9fc',
    overflow: 'auto',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 24px', background: 'rgba(250,249,252,0.8)',
    backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 10,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: '50%', background: '#fff',
    border: '1px solid rgba(183,148,244,0.2)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18, fontWeight: 700, color: '#2e2f2d', margin: 0,
  },
  content: {
    padding: '0 24px 40px',
  },
  heroSection: {
    marginTop: 16, marginBottom: 24, textAlign: 'center',
  },
  heroTag: {
    fontSize: 11, fontWeight: 700, color: '#6d4ca6', background: '#f5f0ff',
    padding: '4px 10px', borderRadius: 99, display: 'inline-block', marginBottom: 12,
  },
  heroTitle: {
    fontSize: 24, fontWeight: 800, color: '#2e2f2d', margin: '0 0 12px', lineHeight: 1.4,
  },
  heroDesc: {
    fontSize: 14, color: '#7b7482', margin: 0, lineHeight: 1.6,
  },
  featuresRow: {
    display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32,
  },
  featureItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    fontSize: 11, fontWeight: 600, color: '#5b5c5a',
  },
  iconCircle: {
    width: 40, height: 40, borderRadius: '50%', background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#6d4ca6', boxShadow: '0 4px 12px rgba(183,148,244,0.1)',
  },
  productList: {
    display: 'flex', flexDirection: 'column', gap: 20,
  },
  kitCard: {
    background: '#fff', borderRadius: 24, padding: 24, position: 'relative',
    boxShadow: '0 8px 30px rgba(183,148,244,0.08)',
  },
  popularBadge: {
    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #6d4ca6, #b794f4)', color: '#fff',
    fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 99,
  },
  tagRow: {
    display: 'flex', gap: 6, marginBottom: 16,
  },
  tag: {
    fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6,
  },
  kitTitle: {
    fontSize: 20, fontWeight: 800, color: '#2e2f2d', margin: '0 0 8px',
  },
  kitDesc: {
    fontSize: 13, color: '#7b7482', margin: '0 0 20px', lineHeight: 1.5,
  },
  priceRow: {
    display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 20,
  },
  originalPrice: {
    fontSize: 14, color: '#adadab', textDecoration: 'line-through', fontWeight: 500,
    marginBottom: 3,
  },
  price: {
    fontSize: 24, fontWeight: 800, color: '#2e2f2d',
  },
  buyBtn: {
    width: '100%', padding: '16px', borderRadius: 16, border: 'none', color: '#fff',
    fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, cursor: 'pointer', fontFamily: "'Manrope', sans-serif",
  }
};
