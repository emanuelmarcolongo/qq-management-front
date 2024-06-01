interface SelectOption {
  value: string;
  label: string;
}

interface UtilityBarConfig {
  baseUrl: string;
  selectOptions: SelectOption[];
  buttonConfig?: {
    label: string;
  };
}
