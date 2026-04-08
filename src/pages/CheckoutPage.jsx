import React, { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, ShoppingBag, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CheckoutPage({ kit, onBack, onComplete }) {
  const { currentUser } = useAuth();
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!recipient || !phone || !address) {
      alert("배송 정보를 모두 입력해주세요.");
      return;
    }

    setIsProcessing(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: currentUser?.uid || 'guest',
        userEmail: currentUser?.email || '',
        kitId: kit.id,
        kitTitle: kit.title,
        price: kit.price,
        shippingInfo: {
          recipient,
          phone,
          address: `${address} ${addressDetail}`
        },
        paymentMethod: paymentMethod,
        status: 'PAID', // 결제 완료 상태
        createdAt: serverTimestamp()
      });
      onComplete();
    } catch (error) {
      console.error("결제 에러:", error);
      alert("결제 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>
          <ArrowLeft size={20} color="#6d4ca6" />
        </button>
        <h1 style={styles.headerTitle}>주문/결제</h1>
        <div style={{width: 40}}></div>
      </div>

      <div style={styles.content}>
        {/* Order Item */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}><ShoppingBag size={18} color="#6d4ca6" style={{marginRight: 8}}/> 주문 상품</h2>
          <div style={styles.card}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
              <span style={{fontSize:16, fontWeight:700, color:'#2e2f2d'}}>{kit.title}</span>
              <span style={{fontSize:16, fontWeight:800, color:'#6d4ca6'}}>{kit.price.toLocaleString()}원</span>
            </div>
            <div style={{fontSize:13, color:'#7b7482'}}>{kit.description}</div>
          </div>
        </div>

        {/* Shipping Info */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}><MapPin size={18} color="#6d4ca6" style={{marginRight: 8}}/> 배송지 정보</h2>
          <div style={styles.card}>
            <input 
              placeholder="받는 분 성함" 
              value={recipient} 
              onChange={e => setRecipient(e.target.value)} 
              style={styles.input} 
            />
            <input 
              placeholder="휴대폰 번호 ( - 생략 )" 
              type="tel"
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              style={styles.input} 
            />
            <input 
              placeholder="기본 주소" 
              value={address} 
              onChange={e => setAddress(e.target.value)} 
              style={styles.input} 
            />
            <input 
              placeholder="상세 주소" 
              value={addressDetail} 
              onChange={e => setAddressDetail(e.target.value)} 
              style={{...styles.input, marginBottom: 0}} 
            />
          </div>
        </div>

        {/* Payment Method */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}><CreditCard size={18} color="#6d4ca6" style={{marginRight: 8}}/> 결제 수단</h2>
          <div style={styles.card}>
            {[
              {id: 'card', name: '신용/체크카드'},
              {id: 'vbank', name: '가상계좌'},
              {id: 'kakaopay', name: '카카오페이'}
            ].map(method => (
              <div 
                key={method.id} 
                onClick={() => setPaymentMethod(method.id)}
                style={{
                  ...styles.methodItem, 
                  borderBottom: method.id === 'kakaopay' ? 'none' : '1px solid #f0edf5'
                }}
              >
                <div style={styles.radioWrapper}>
                  <div style={{
                    ...styles.radioInner, 
                    background: paymentMethod === method.id ? '#6d4ca6' : 'transparent',
                    border: paymentMethod === method.id ? '4px solid #f5f0ff' : '2px solid #ccc3d2'
                  }} />
                </div>
                <span style={{fontSize: 14, fontWeight: paymentMethod === method.id ? 700 : 500, color: '#2e2f2d'}}>
                  {method.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Fixed Bottom CTA */}
      <div style={styles.bottomBar}>
        <div style={styles.totalRow}>
          <span style={{fontSize:14, fontWeight:600, color:'#5b5c5a'}}>총 결제 금액</span>
          <span style={{fontSize:22, fontWeight:800, color:'#2e2f2d'}}>{kit.price.toLocaleString()}원</span>
        </div>
        <button onClick={handlePayment} disabled={isProcessing} style={styles.payBtn}>
          {isProcessing ? '처리중...' : '결제하기'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100%', display: 'flex', flexDirection: 'column', background: '#faf9fc',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 24px', background: '#fff', borderBottom: '1px solid rgba(183,148,244,0.1)',
    position: 'sticky', top: 0, zIndex: 10,
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
    flex: 1, padding: '24px 24px 100px', overflow: 'auto',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16, fontWeight: 800, color: '#2e2f2d', margin: '0 0 12px',
    display: 'flex', alignItems: 'center',
  },
  card: {
    background: '#fff', borderRadius: 20, padding: 20,
    boxShadow: '0 4px 20px rgba(183,148,244,0.06)',
  },
  input: {
    width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #e3e2e6',
    fontSize: 14, fontFamily: "'Manrope', sans-serif", marginBottom: 12,
    outlineColor: '#b794f4', boxSizing: 'border-box'
  },
  methodItem: {
    display: 'flex', alignItems: 'center', padding: '14px 0', cursor: 'pointer',
  },
  radioWrapper: {
    width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', marginRight: 12,
  },
  radioInner: {
    width: '100%', height: '100%', borderRadius: '50%', transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  },
  bottomBar: {
    position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 480, margin: '0 auto',
    background: '#fff', padding: '16px 24px 24px',
    boxShadow: '0 -4px 24px rgba(0,0,0,0.05)', borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  totalRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
  },
  payBtn: {
    width: '100%', padding: '18px', borderRadius: 16, border: 'none',
    background: 'linear-gradient(135deg, #6d4ca6, #b794f4)', color: '#fff',
    fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Manrope', sans-serif",
  }
};
