import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarIcon, PlusIcon, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export function DatePicker({ onChange, selected }: any) {
  const [date, setDate] = useState<Date>(selected);

  useEffect(() => {
    if (selected !== date) {
      setDate(selected);
    }
  }, [selected]);

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
    onChange(newDate); // Notificar o React Hook Form sobre a mudança
  };

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 col-span-3">
        <Calendar
          captionLayout='dropdown-buttons'
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          locale={ptBR}
          fromYear={1960}
          toYear={2025}
        />
      </PopoverContent>
    </Popover>
  )
}