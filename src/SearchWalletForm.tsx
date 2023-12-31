import { FieldError, useForm } from 'react-hook-form';
import { SearchCriteria } from './api/types';

type Props = {
  onSearch: (address: SearchCriteria) => void;
};

export function SearchWalletForm({ onSearch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchCriteria>();

  const fieldStyle = 'flex flex-col mb-2';

  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? 'border border-red-500' : 'border border-slate-700';
  }
  return (
    <form noValidate className="border-b my-3 sm:my-4" onSubmit={handleSubmit(onSearch)}>
      <div className={fieldStyle}>
        <input
          type="text"
          id="address"
          placeholder="Wallet address..."
          {...register('address', { required: 'You must enter a wallet address' })}
          className={'p-2 ' + getEditorStyle(errors.address)}
        />
        <ValidationError fieldError={errors.address} />
      </div>
      <div className={fieldStyle}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 p-2 font-semibold bg-slate-700 text-white self-start"
        >
          Search
        </button>
      </div>
    </form>
  );
}

function ValidationError({ fieldError }: { fieldError: FieldError | undefined }) {
  if (!fieldError) {
    return null;
  }
  return (
    <div role="alert" className="text-red-500 text-xs mt-1">
      {fieldError.message}
    </div>
  );
}
