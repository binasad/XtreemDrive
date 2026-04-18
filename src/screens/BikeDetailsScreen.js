import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useCardStyle } from '../components/Card';

const { width } = Dimensions.get('window');

const GALLERY = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDp9BW8lWl2bN9ic3_2ekZkJ_pso4f8ZfO7bItRRTHdNvxTVgXDKKbRffw5j4ruyaSvVe21x34SatzLOIfUb6pzOcuHvXbGxAvGFNSMimiQ_mjMaRAFyowVyNM97aVK743G3s9mcBsoUt8h97Ga0jLWCwqcaeQqaSWqLTAnfFoCOqlFNozwZe9MUscbFxqN7VcSi-Uke9GZB4nzaJrCkjoOQSI_uou2q_QP6E12LFbzwdRepQfNVnC0zLpjUx6nxIjO99dbbkQD_MEH',
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200',
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200',
];

const FEATURES = [
  'ABS',
  'Digital Speedometer',
  'LED Headlights',
  'Fuel Injection',
  'Traction Control',
  'Quick Shifter',
];

function IconBtn({ icon, onPress, colors, accent }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MaterialIcons name={icon} size={20} color={accent ? colors.primary : '#fff'} />
    </TouchableOpacity>
  );
}

export default function BikeDetailsScreen({ route, navigation }) {
  const { colors, radius, mode } = useTheme();
  const specCardStyle = useCardStyle();
  const insets = useSafeAreaInsets();
  
  const bike = route?.params?.bike || {
    title: 'Kawasaki Ninja ZX-10R',
    price: 'PKR 4,500,000',
    location: 'DHA, Lahore',
    year: '2023',
    mileage: '1,200 km',
    type: 'Manual',
    registeredIn: 'Lahore',
    bodyType: 'Sports',
    engineCapacity: '998 cc',
    lastUpdated: '2 days ago',
  };

  const [active, setActive] = useState(0);
  const [fav, setFav] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const isLight = mode === 'light';

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ position: 'absolute', zIndex: 10, width: '100%' }}>
        <View style={styles.topBar}>
          <IconBtn icon="arrow-back" onPress={() => navigation.goBack()} colors={colors} />
          <View style={{ flexDirection: 'row' }}>
            <IconBtn icon="share" colors={colors} />
            <View style={{ width: 10 }} />
            <IconBtn
              icon={fav ? 'favorite' : 'favorite-border'}
              onPress={() => setFav((v) => !v)}
              colors={colors}
              accent={fav}
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Gallery */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) =>
              setActive(Math.round(e.nativeEvent.contentOffset.x / width))
            }
          >
            {GALLERY.map((img, i) => (
              <Image key={i} source={{ uri: img }} style={{ width, height: 400 }} resizeMode="cover" />
            ))}
          </ScrollView>
          <View style={styles.dots}>
            {GALLERY.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === active ? colors.primary : 'rgba(255,255,255,0.3)',
                    width: i === active ? 24 : 8,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Header Info */}
        <View style={{ paddingHorizontal: 20, marginTop: -30 }}>
          <View style={[styles.headerCard, { backgroundColor: isLight ? '#ffffff' : colors.surfaceAlt, borderRadius: radius.xl, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 }]}>
            <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
              Premium Listing
            </Text>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
              {bike.title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 16 }}>
              <MaterialIcons name="location-on" size={14} color={colors.textDim} />
              <Text style={{ color: colors.textDim, fontSize: 13, marginLeft: 4 }}>
                {bike.location}
              </Text>
            </View>
            <Text style={[styles.price, { color: isLight ? '#000000' : colors.primary }]}>{bike.price}</Text>
          </View>
        </View>

        {/* Quick Stats Row */}
        <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={[styles.quickStatBox, { backgroundColor: isLight ? '#f5f6f7' : colors.surfaceHigh, borderRadius: radius.lg }]}>
            <MaterialIcons name="calendar-today" size={24} color={colors.primary} />
            <Text style={{ color: colors.textDim, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>Year</Text>
            <Text style={{ color: colors.text, fontWeight: '800', marginTop: 4 }}>{bike.year}</Text>
          </View>
          <View style={[styles.quickStatBox, { backgroundColor: isLight ? '#f5f6f7' : colors.surfaceHigh, borderRadius: radius.lg }]}>
            <MaterialIcons name="speed" size={24} color={colors.primary} />
            <Text style={{ color: colors.textDim, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>Mileage</Text>
            <Text style={{ color: colors.text, fontWeight: '800', marginTop: 4 }}>{bike.mileage}</Text>
          </View>
          <View style={[styles.quickStatBox, { backgroundColor: isLight ? '#f5f6f7' : colors.surfaceHigh, borderRadius: radius.lg }]}>
            <MaterialIcons name="settings-input-component" size={24} color={colors.primary} />
            <Text style={{ color: colors.textDim, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>Type</Text>
            <Text style={{ color: colors.text, fontWeight: '800', marginTop: 4 }}>{bike.type}</Text>
          </View>
        </View>

        {/* Details Specs */}
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Technical Specs</Text>
          <View style={{ marginTop: 12 }}>
            {[
              { label: 'Registered In', value: bike.registeredIn },
              { label: 'Body Type', value: bike.bodyType },
              { label: 'Engine Capacity', value: bike.engineCapacity },
              { label: 'Last Updated', value: bike.lastUpdated },
            ].map((item, idx) => (
              <View key={idx} style={[styles.specRow, { borderBottomColor: isLight ? '#e0e0e0' : 'rgba(255,255,255,0.05)' }]}>
                <Text style={{ color: colors.textDim }}>{item.label}</Text>
                <Text style={{ color: colors.text, fontWeight: '700' }}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Seller Comments */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <View style={[styles.sellerNoteBox, { backgroundColor: isLight ? '#f5f6f7' : colors.surfaceAlt, borderRadius: radius.xl }]}>
            <MaterialIcons name="format-quote" size={80} color={isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'} style={{ position: 'absolute', top: 0, right: 10 }} />
            <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 12 }]}>Seller's Note</Text>
            <Text style={{ color: colors.textMuted, lineHeight: 22, fontSize: 14 }} numberOfLines={descExpanded ? undefined : 4}>
              Exceptional condition Kawasaki Ninja ZX-10R 2023. This is the ultimate track-focused machine, maintained with obsessive care. Zero accidents, original paint, and complete service history from authorized dealership. Includes aftermarket Akrapovic exhaust system (stock available) and ceramic coating applied recently. A true masterpiece for enthusiasts...
            </Text>
            <TouchableOpacity onPress={() => setDescExpanded(!descExpanded)} style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 13 }}>
                {descExpanded ? 'Collapse' : 'Read Full Description'}
              </Text>
              <MaterialIcons name={descExpanded ? "expand-less" : "expand-more"} size={16} color={colors.primary} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Checklist */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Features</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 16 }}>
            {FEATURES.map((feature, idx) => (
              <View key={idx} style={[styles.featureBadge, { backgroundColor: isLight ? '#f0f0f0' : 'rgba(255,255,255,0.05)', borderRadius: radius.md }]}>
                <MaterialIcons name="check-circle-outline" size={16} color={isLight ? '#000000' : colors.primary} />
                <Text style={{ color: colors.text, fontSize: 13, marginLeft: 8 }}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Report Ad Link */}
        <View style={{ paddingHorizontal: 20, marginTop: 16, alignItems: 'center' }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="flag" size={16} color={colors.textMuted} />
            <Text style={{ color: colors.textMuted, fontSize: 12, marginLeft: 4, textDecorationLine: 'underline' }}>
              Report Ad
            </Text>
          </TouchableOpacity>
        </View>

        {/* Seller Info */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 24 }}>
          <TouchableOpacity style={[styles.sellerCard, { backgroundColor: isLight ? '#ffffff' : colors.surfaceHigh, borderRadius: radius.xl, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden', borderWidth: 2, borderColor: 'rgba(231,76,60,0.3)' }}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400' }} style={{ width: '100%', height: '100%' }} />
              </View>
              <View style={{ marginLeft: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: colors.text, fontWeight: '800', fontSize: 16 }}>Hamza Ahmed</Text>
                  <MaterialIcons name="verified" size={16} color="#4bb543" style={{ marginLeft: 6 }} />
                </View>
                <Text style={{ color: colors.textDim, fontSize: 12, marginTop: 4 }}>Member since Oct 2021</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textDim} />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Sticky Bottom Nav Bar */}
      <View style={[styles.bottomBar, { backgroundColor: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(30,30,30,0.95)', paddingBottom: insets.bottom || 20, borderTopColor: isLight ? '#e0e0e0' : 'rgba(255,255,255,0.1)' }]}>
        <TouchableOpacity style={styles.navAction}>
          <MaterialIcons name="phone" size={24} color={colors.primary} />
          <Text style={{ color: colors.textMuted, fontSize: 10, marginTop: 4, fontWeight: '700' }}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navAction}>
          <MaterialIcons name="sms" size={24} color={colors.primary} />
          <Text style={{ color: colors.textMuted, fontSize: 10, marginTop: 4, fontWeight: '700' }}>SMS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navAction} onPress={() => navigation.navigate('Chat', { conversation: { id: 'c1', name: 'Hamza Ahmed' } })}>
          <MaterialIcons name="chat" size={24} color={colors.primary} />
          <Text style={{ color: colors.textMuted, fontSize: 10, marginTop: 4, fontWeight: '700' }}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.whatsappBtn, { backgroundColor: colors.primary, borderRadius: radius.lg }]}>
          <Text style={{ color: isLight ? '#ffffff' : '#000000', fontWeight: '900', fontSize: 13 }}>WHATSAPP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dots: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  headerCard: {
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  price: {
    fontSize: 26,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  quickStatBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  sellerNoteBox: {
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    width: '48%',
    marginBottom: 12,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  navAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappBtn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    marginLeft: 8,
    marginRight: 8,
  },
});
