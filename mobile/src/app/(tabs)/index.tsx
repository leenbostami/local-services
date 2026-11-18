import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { AppHeader } from '@/components/brand/AppHeader';
import { FeaturedService } from '@/components/home/FeaturedService';
import { ServiceTile } from '@/components/home/ServiceTile';
import { WorkerCard } from '@/components/home/WorkerCard';
import { Chip } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { Screen, ScreenBody } from '@/components/ui/Screen';
import { cities, cityById } from '@/domain/catalog';
import { greetingKey } from '@/domain/format';
import { searchMarketplace } from '@/domain/search';
import { localize } from '@/domain/types';
import { trustedIn } from '@/i18n/copy';
import { useAuth } from '@/auth/AuthProvider';
import { useLocale } from '@/i18n/LocaleProvider';
import { useMarketplace } from '@/state/MarketplaceProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function HomeScreen() {
  const router = useRouter();
  const { locale, copy } = useLocale();
  const { colors, fonts, radius, spacing, shadow, writing } = useTheme();
  const { cityId, setCityId } = useMarketplace();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const city = cityById(cityId);
  const results = searchMarketplace(query, locale, cityId);
  const featured = results.services.find((service) => service.featured) ?? results.services[0];
  const cityName = city ? localize(city.name, locale) : '';

  const openService = (serviceId: string) => {
    router.push({ pathname: '/service/[id]', params: { id: serviceId } });
  };

  return (
    <Screen scroll>
      <AppHeader />
      <ScreenBody>
        <View style={{ gap: spacing.xs }}>
          <Text
            style={{
              color: colors.muted,
              fontFamily: fonts.medium,
              fontSize: 15,
              textAlign: writing.align,
            }}
          >
            {user
              ? `${copy[greetingKey()]}${locale === 'ar' ? '،' : ','} ${user.name}`
              : copy[greetingKey()]}
          </Text>
          <Text
            style={{
              color: colors.text,
              fontFamily: fonts.bold,
              fontSize: 30,
              lineHeight: 36,
              textAlign: writing.align,
            }}
          >
            {copy.headline}
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontFamily: fonts.semibold,
              fontSize: 14,
              textAlign: writing.align,
            }}
          >
            {copy.tagline}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            backgroundColor: colors.surface,
            borderRadius: radius.pill,
            paddingHorizontal: spacing.lg,
            minHeight: 52,
            ...shadow.card,
          }}
        >
          <Icon name="search" color={colors.muted} size={18} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={copy.searchPlaceholder}
            placeholderTextColor={colors.muted}
            style={{
              flex: 1,
              color: colors.text,
              fontFamily: fonts.regular,
              fontSize: 15,
              textAlign: writing.align,
              paddingVertical: 12,
            }}
          />
        </View>

        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name="pin" color={colors.primary} size={16} />
            <Text style={{ color: colors.text, fontFamily: fonts.semibold, fontSize: 15 }}>
              {cityName}
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.sm }}
          >
            {cities.map((item) => (
              <Chip
                key={item.id}
                label={localize(item.name, locale)}
                selected={item.id === cityId}
                onPress={() => setCityId(item.id)}
              />
            ))}
          </ScrollView>
        </View>

        {featured ? (
          <FeaturedService service={featured} onPress={() => openService(featured.id)} />
        ) : null}

        <View style={{ gap: spacing.lg }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Text style={{ color: colors.text, fontFamily: fonts.bold, fontSize: 18 }}>
              {query.trim() ? copy.results : copy.popularServices}
            </Text>
            {query.trim() ? (
              <Text
                onPress={() => setQuery('')}
                style={{ color: colors.primary, fontFamily: fonts.semibold, fontSize: 14 }}
              >
                {copy.seeAll}
              </Text>
            ) : null}
          </View>

          {results.services.length === 0 && results.workers.length === 0 ? (
            <Text
              style={{
                color: colors.muted,
                fontFamily: fonts.regular,
                fontSize: 15,
                textAlign: writing.align,
              }}
            >
              {copy.emptySearch}
            </Text>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing.lg }}>
              {results.services.map((service) => (
                <ServiceTile
                  key={service.id}
                  service={service}
                  onPress={() => openService(service.id)}
                />
              ))}
            </View>
          )}
        </View>

        <View style={{ gap: spacing.md }}>
          <Text
            style={{
              color: colors.text,
              fontFamily: fonts.bold,
              fontSize: 18,
              textAlign: writing.align,
            }}
          >
            {trustedIn(locale, cityName)}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.md }}
          >
            {results.workers.map((worker, index) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                index={index}
                onPress={() => {
                  const serviceId = worker.serviceIds[0];
                  if (serviceId) {
                    openService(serviceId);
                  }
                }}
              />
            ))}
          </ScrollView>
        </View>
      </ScreenBody>
    </Screen>
  );
}
