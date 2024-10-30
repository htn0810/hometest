export type IconProps = React.SVGProps<SVGSVGElement>;

export type ToastType = 'success' | 'error';

export interface IToast  {
  id: number;
  type: ToastType;
  message: string;
}