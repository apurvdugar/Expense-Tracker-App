import { Card } from '@radix-ui/themes';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass = 'text-primary' }) => {
  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-3xl font-bold">{value}</h3>
            {trendValue && (
              <div className={`mt-2 flex items-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
                <TrendIcon className="h-4 w-4" />
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={`rounded-xl  p-3 ${colorClass}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
