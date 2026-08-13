import { Product, BedSize, BedLength, ProductType } from '~/types';

export const SIZE_LABELS: Record<BedSize, { name: string; dims: string }> = {
  single: { name: 'Single', dims: '91cm × 188cm' },
  threeQuarter: { name: 'Three Quarter', dims: '107cm × 188cm' },
  double: { name: 'Double', dims: '137cm × 188cm' },
  queen: { name: 'Queen', dims: '152cm × 188cm' },
  king: { name: 'King', dims: '183cm × 188cm' },
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(amount).replace('ZAR', 'R');
}

export function calculatePrice(
  product: Product,
  size: BedSize,
  length: BedLength = 'standard',
  type: ProductType = 'set'
): number {
  const isExtra = length === 'extraLength';

  if (type === 'mattressOnly') {
    if (isExtra && product.prices.extraLengthMattressOnly?.[size]) {
      return product.prices.extraLengthMattressOnly[size]!;
    }
    if (product.prices.mattressOnly?.[size]) {
      return product.prices.mattressOnly[size]!;
    }
  }

  if (isExtra && product.prices.extraLengthSet?.[size]) {
    return product.prices.extraLengthSet[size]!;
  }

  if (product.prices.set[size]) {
    return product.prices.set[size]!;
  }

  // Fallback to starting price or any available size price
  const available = Object.values(product.prices.set)[0];
  return available || 0;
}

export function getStartingPrice(product: Product): number {
  const setPrices = Object.values(product.prices.set).filter(Boolean) as number[];
  const mattressPrices = product.prices.mattressOnly
    ? (Object.values(product.prices.mattressOnly).filter(Boolean) as number[])
    : [];
  const all = [...setPrices, ...mattressPrices];
  return all.length ? Math.min(...all) : 0;
}

export function calculateInstallment(price: number): number {
  return Math.round(price / 4);
}
