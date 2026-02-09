export const containerTableVariants = {
  /* -------------------------------------------------- */
  /* DEFAULT — clean & neutral                          */
  /* -------------------------------------------------- */
  default: {
    wrapper:
      'relative flex flex-col w-full h-full overflow-auto bg-white rounded-lg shadow-sm ring-1 ring-slate-200',
    table:
      'w-full min-w-max table-auto text-left text-sm',
    th:
      'p-4 bg-slate-50 border-b border-slate-200',
    thText:
      'block font-semibold text-slate-600 tracking-wide',
    tr:
      'hover:bg-slate-50 transition-colors',
    td:
      'p-4 border-b border-slate-100 text-slate-700'
  },

  /* -------------------------------------------------- */
  /* COMPACT — dense / ops-heavy                        */
  /* -------------------------------------------------- */
  compact: {
    wrapper:
      'relative flex flex-col w-full h-full overflow-auto bg-white rounded-md ring-1 ring-slate-300',
    table:
      'w-full min-w-max table-auto text-left text-[11px] font-mono',
    th:
      'px-2 py-1.5 bg-slate-100 border-b border-slate-300',
    thText:
      'uppercase tracking-wider text-slate-500',
    tr:
      'hover:bg-slate-200/40',
    td:
      'px-2 py-1.5 border-b border-slate-200 text-slate-700'
  },

  /* -------------------------------------------------- */
  /* SPACIOUS — readability / presentation              */
  /* -------------------------------------------------- */
  spacious: {
    wrapper:
      'relative flex flex-col w-full h-full overflow-auto bg-white rounded-xl shadow-lg',
    table:
      'w-full min-w-max table-auto text-left text-base',
    th:
      'px-6 py-5 bg-slate-100 border-b border-slate-300',
    thText:
      'font-bold text-slate-800',
    tr:
      'hover:bg-slate-50',
    td:
      'px-6 py-5 border-b border-slate-200 text-slate-800 leading-relaxed'
  },

  /* -------------------------------------------------- */
  /* ELEVATED — modern card UI                          */
  /* -------------------------------------------------- */
  elevated: {
    wrapper:
      'relative flex flex-col w-full h-full overflow-auto bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl',
    table:
      'w-full min-w-max table-auto text-left text-sm border-separate border-spacing-y-2',
    th:
      'px-5 py-3 bg-transparent',
    thText:
      'text-slate-500 font-semibold',
    tr:
      'bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow',
    td:
      'px-5 py-4 first:rounded-l-xl last:rounded-r-xl text-slate-700'
  },

  /* -------------------------------------------------- */
  /* DARK — monitoring / dashboard                     */
  /* -------------------------------------------------- */
  dark: {
    wrapper:
      'relative flex flex-col w-full h-full overflow-auto bg-slate-900 rounded-lg shadow-2xl',
    table:
      'w-full min-w-max table-auto text-left text-sm',
    th:
      'px-4 py-3 bg-slate-800 border-b border-slate-700',
    thText:
      'text-slate-300 font-semibold',
    tr:
      'hover:bg-slate-800/70 transition-colors',
    td:
      'px-4 py-3 border-b border-slate-800 text-slate-200'
  },

  /* -------------------------------------------------- */
  /* ANIMATED — polished & delightful                  */
  /* -------------------------------------------------- */
  animated: {
    wrapper:
      'relative flex flex-col w-full h-full overflow-auto bg-white rounded-xl shadow-lg p-1',
    table:
      'w-full min-w-max table-auto text-left text-sm',
    th:
      'px-4 py-3 bg-slate-50 border-b border-slate-200',
    thText:
      'text-slate-600 font-semibold',
    tr:
      'hover:bg-indigo-50 hover:scale-[1.01] transition-all duration-150',
    td:
      'px-4 py-3 border-b border-slate-100 text-slate-700'
  }
} as const;

export type ContainerTableVariant = keyof typeof containerTableVariants;
