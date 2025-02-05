import React from 'react';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { colors } from '@/styles/pdf';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottom: `2 solid ${colors.primary}`,
    paddingBottom: 15,
  },
  logoContainer: {
    width: 160,
    marginRight: 20,
  },
  logo: {
    width: '100%',
    height: 'auto',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    color: colors.text.secondary,
  },
  contactContainer: {
    alignItems: 'flex-end',
  },
  contactInfo: {
    fontSize: 9,
    color: colors.text.secondary,
    marginBottom: 2,
    fontFamily: 'Montserrat',
  },
  date: {
    fontSize: 9,
    color: colors.text.light,
    marginTop: 6,
    fontFamily: 'Montserrat',
  },
  divider: {
    height: 2,
    backgroundColor: colors.primary,
    marginTop: 15,
  }
});

interface HeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  showContact?: boolean;
  showDate?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showLogo = true,
  showContact = true,
  showDate = true,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <View>
      <View style={styles.header}>
        {showLogo && (
          <View style={styles.logoContainer}>
            <Image 
              src="/images/logo.png" 
              style={styles.logo}
            />
          </View>
        )}
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          {showContact && (
            <View style={styles.contactContainer}>
              <Text style={styles.contactInfo}>Buckalew Financial Services</Text>
              <Text style={styles.contactInfo}>3031 Mojave Oak Dr</Text>
              <Text style={styles.contactInfo}>Valrico, FL 33594</Text>
              <Text style={styles.contactInfo}>844-779-7600</Text>
              <Text style={styles.contactInfo}>larry@buckalewfinancialservices.com</Text>
              {showDate && <Text style={styles.date}>{currentDate}</Text>}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;