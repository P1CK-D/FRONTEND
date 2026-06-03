import { IconBolt } from '@tabler/icons-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface LoadingScreenProps {
  onFinish?: () => void;
  duration?: number;
}

const QUOTES = [
  {
    text: '우리는 반복하는 행동으로\n만들어진다. 탁월함은\n행동이 아니라 습관이다.',
    author: '— 아리스토텔레스',
  },
  {
    text: '당신이 오늘 한 일이\n내일의 당신을 만든다.',
    author: '— 익명',
  },
  {
    text: '좋은 습관을 만드는 가장 쉬운 방법은\n나쁜 습관 대신\n좋은 행동을 넣는 것이다.',
    author: '— 제임스 클리어',
  },
  {
    text: '자기 자신을 통제하는 것이\n세상에서 가장 어려운 일이다.',
    author: '— 톨스토이',
  },
  {
    text: '작은 변화가 모여\n큰 전환을 만든다.',
    author: '— Pickdo',
  },
];

export default function LoadingScreen({
  onFinish,
  duration = 3200,
}: LoadingScreenProps) {
  const [quote] = useState(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );

  const logoOpacity   = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(20)).current;
  const quoteOpacity  = useRef(new Animated.Value(0)).current;
  const quoteTranslateY = useRef(new Animated.Value(16)).current;
  const barWidth      = useRef(new Animated.Value(0)).current;
  const barOpacity    = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const BAR_MAX = Dimensions.get('window').width * 0.52;

  useEffect(() => {

    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1, duration: 600, useNativeDriver: true,
      }),
      Animated.timing(logoTranslateY, {
        toValue: 0, duration: 600, useNativeDriver: true,
      }),
    ]).start();


    setTimeout(() => {
      Animated.parallel([
        Animated.timing(quoteOpacity, {
          toValue: 1, duration: 600, useNativeDriver: true,
        }),
        Animated.timing(quoteTranslateY, {
          toValue: 0, duration: 600, useNativeDriver: true,
        }),
      ]).start();
    }, 300);

    setTimeout(() => {
      Animated.timing(barOpacity, {
        toValue: 1, duration: 400, useNativeDriver: true,
      }).start();
      Animated.timing(barWidth, {
        toValue: BAR_MAX,
        duration: duration - 800,
        useNativeDriver: false, 
      }).start();
    }, 500);


    setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0, duration: 400, useNativeDriver: true,
      }).start(() => onFinish?.());
    }, duration - 300);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0e0f13" />

      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ translateY: logoTranslateY }] },
        ]}
      >
        <View style={styles.logoIcon}>
          <View style={styles.logoIconOverlay} />
          <IconBolt />
        </View>
        <Text style={styles.logoText}>pickdo</Text>
        <Text style={styles.logoSub}>DOPAMINE SWITCH</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.quoteWrap,
          { opacity: quoteOpacity, transform: [{ translateY: quoteTranslateY }] },
        ]}
      >
        <Text style={styles.quoteText}>{quote.text}</Text>
        <Text style={styles.quoteAuthor}>{quote.author}</Text>
      </Animated.View>

      <Animated.View style={[styles.barWrap, { opacity: barOpacity }]}>
        <View style={[styles.barTrack, { width: BAR_MAX }]}>
          <Animated.View style={[styles.barFill, { width: barWidth }]} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

// ── 번개 아이콘 (SVG 없이 순수 View로 구현) ───────────────
<IconBolt size={38} color="#fff" strokeWidth={2.2} />

const boltStyles = StyleSheet.create({
  wrap: {
    width: 22,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 13,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255,255,255,0.95)',
    marginBottom: -4,
  },
  bottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 13,
    borderRightWidth: 7,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(255,255,255,0.95)',
    marginTop: -4,
  },
});


const COLORS = {
  bg:    '#0e0f13',
  p:     '#00D1BC',
  pDim:  'rgba(0,209,188,0.30)',
  txt:   '#f0f2f8',
  txt2:  '#9499b0',
  txt3:  '#5a5f78',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  logoWrap: {
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 76,
    height: 76,
    backgroundColor: COLORS.p,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 22,
  },
  logoText: {
    fontFamily: 'System', 
    fontWeight: '800',
    fontSize: 30,
    letterSpacing: -0.5,
    color: COLORS.txt,
  },
  logoSub: {
    fontSize: 11,
    color: COLORS.txt3,
    letterSpacing: 2.5,
    fontWeight: '500',
  },

  quoteWrap: {
    maxWidth: 270,
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
  },
  quoteText: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.txt2,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 12,
    color: COLORS.txt3,
    textAlign: 'center',
  },

  barWrap: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  barTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: 2,
    backgroundColor: COLORS.p,
    borderRadius: 2,
  },
});