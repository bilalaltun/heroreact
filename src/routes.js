/* eslint-disable */
import { lazy } from 'react';
import { USER_ROLE } from 'constants.js';
import { DEFAULT_PATHS } from 'config.js';

const dashboards = {
  index: lazy(() => import('views/dashboards/Dashboards')),
  default: lazy(() => import('views/dashboards/DashboardsDefault')),
  visual: lazy(() => import('views/dashboards/DashboardsVisual')),
  analytic: lazy(() => import('views/dashboards/DashboardsAnalytic')),
};
const apps = {
  index: lazy(() => import('views/apps/Apps')),
  calendar: lazy(() => import('views/apps/calendar/Calendar')),
  chat: lazy(() => import('views/apps/chat/Chat')),
  contacts: lazy(() => import('views/apps/contacts/Contacts')),
  mailbox: lazy(() => import('views/apps/mailbox/Mailbox')),
  tasks: lazy(() => import('views/apps/tasks/Tasks')),
};
const masraf = {
  index: lazy(() => import('views/masraf/Masraf')),
  masrafekle: lazy(() => import('views/masraf/MasrafEkle')),
  masraflistele: lazy(() => import('views/masraf/MasrafListele')),
};
const rapor = {
  rapor: lazy(() => import('views/rapor/Rapor')),
};
const pages = {
  index: lazy(() => import('views/pages/Pages')),
  authentication: {
    index: lazy(() => import('views/pages/authentication/Authentication')),
    login: lazy(() => import('views/pages/authentication/Login')),
    register: lazy(() => import('views/pages/authentication/Register')),
    forgotPassword: lazy(() => import('views/pages/authentication/ForgotPassword')),
    resetPassword: lazy(() => import('views/pages/authentication/ResetPassword')),
  },
  blog: {
    index: lazy(() => import('views/pages/blog/Blog')),
    home: lazy(() => import('views/pages/blog/BlogHome')),
    grid: lazy(() => import('views/pages/blog/BlogGrid')),
    list: lazy(() => import('views/pages/blog/BlogList')),
    detail: lazy(() => import('views/pages/blog/BlogDetail')),
  },
  miscellaneous: {
    index: lazy(() => import('views/pages/miscellaneous/Miscellaneous')),
    faq: lazy(() => import('views/pages/miscellaneous/Faq')),
    knowledgeBase: lazy(() => import('views/pages/miscellaneous/KnowledgeBase')),
    error: lazy(() => import('views/pages/miscellaneous/Error')),
    comingSoon: lazy(() => import('views/pages/miscellaneous/ComingSoon')),
    pricing: lazy(() => import('views/pages/miscellaneous/Pricing')),
    search: lazy(() => import('views/pages/miscellaneous/Search')),
    mailing: lazy(() => import('views/pages/miscellaneous/Mailing')),
    empty: lazy(() => import('views/pages/miscellaneous/Empty')),
  },
  portfolio: {
    index: lazy(() => import('views/pages/portfolio/Portfolio')),
    home:  lazy(() => import('views/pages/portfolio/PortfolioHome')),
    detail: lazy(() => import('views/pages/portfolio/PortfolioDetail')),
  },
  profile: {
    index: lazy(() => import('views/pages/profile/Profile')),
    standard: lazy(() => import('views/pages/profile/ProfileStandard')),
    settings: lazy(() => import('views/pages/profile/ProfileSettings')),
  },
};
const blocks = {
  index: lazy(() => import('views/blocks/Blocks')),
  cta: lazy(() => import('views/blocks/cta/Cta')),
  details: lazy(() => import('views/blocks/details/Details')),
  gallery: lazy(() => import('views/blocks/gallery/Gallery')),
  images: lazy(() => import('views/blocks/images/Images')),
  list: lazy(() => import('views/blocks/list/List')),
  stats: lazy(() => import('views/blocks/stats/Stats')),
  steps: lazy(() => import('views/blocks/steps/Steps')),
  tabularData: lazy(() => import('views/blocks/tabulardata/TabularData')),
  thumbnails: lazy(() => import('views/blocks/thumbnails/Thumbnails')),
};
const interfaces = {
  index: lazy(() => import('views/interface/Interface')),
  components: {
    index: lazy(() => import('views/interface/components/Components')),
    accordion: lazy(() => import('views/interface/components/Accordion')),
    alerts: lazy(() => import('views/interface/components/Alerts')),
    badge: lazy(() => import('views/interface/components/Badge')),
    breadcrumb: lazy(() => import('views/interface/components/Breadcrumb')),
    buttons: lazy(() => import('views/interface/components/Buttons')),
    buttonGroup: lazy(() => import('views/interface/components/ButtonGroup')),
    card: lazy(() => import('views/interface/components/Card')),
    closeButton: lazy(() => import('views/interface/components/CloseButton')),
    collapse: lazy(() => import('views/interface/components/Collapse')),
    dropdowns: lazy(() => import('views/interface/components/Dropdowns')),
    listGroup: lazy(() => import('views/interface/components/ListGroup')),
    modal: lazy(() => import('views/interface/components/Modal')),
    navs: lazy(() => import('views/interface/components/Navs')),
    offcanvas: lazy(() => import('views/interface/components/Offcanvas')),
    pagination: lazy(() => import('views/interface/components/Pagination')),
    popovers: lazy(() => import('views/interface/components/Popovers')),
    progress: lazy(() => import('views/interface/components/Progress')),
    spinners: lazy(() => import('views/interface/components/Spinners')),
    toasts: lazy(() => import('views/interface/components/Toasts')),
    tooltips: lazy(() => import('views/interface/components/Tooltips')),
  },
  forms: {
    index: lazy(() => import('views/interface/forms/Forms')),
    layouts: lazy(() => import('views/interface/forms/layouts/Layouts')),
    validation: lazy(() => import('views/interface/forms/validation/Validation')),
    wizard: lazy(() => import('views/interface/forms/wizard/Wizard')),
    inputGroup: lazy(() => import('views/interface/forms/input-group/InputGroup')),
    inputMask: lazy(() => import('views/interface/forms/input-mask/InputMask')),
    genericForms: lazy(() => import('views/interface/forms/generic-forms/GenericForms')),
    controls: {
      index: lazy(() => import('views/interface/forms/controls/Controls')),
      autocomplete: lazy(() => import('views/interface/forms/controls/autocomplete/Autocomplete')),
      checkboxRadio: lazy(() => import('views/interface/forms/controls/checkbox-radio/CheckboxRadio')),
      datePicker: lazy(() => import('views/interface/forms/controls/datepicker/Datepicker')),
      dropzone: lazy(() => import('views/interface/forms/controls/dropzone/Dropzone')),
      editor: lazy(() => import('views/interface/forms/controls/editor/Editor')),
      inputSpinner: lazy(() => import('views/interface/forms/controls/input-spinner/InputSpinner')),
      rating: lazy(() => import('views/interface/forms/controls/rating/Rating')),
      select: lazy(() => import('views/interface/forms/controls/select/Select')),
      slider: lazy(() => import('views/interface/forms/controls/slider/Slider')),
      tags: lazy(() => import('views/interface/forms/controls/tags/Tags')),
    },
  },
  plugins: {
    index: lazy(() => import('views/interface/plugins/Plugins')),
    carousel: lazy(() => import('views/interface/plugins/carousel/Carousel')),
    charts: lazy(() => import('views/interface/plugins/chart/Chart')),
    clamp: lazy(() => import('views/interface/plugins/clamp/Clamp')),
    contextMenu: lazy(() => import('views/interface/plugins/context-menu/ContextMenu')),
    datatables: {
      index: lazy(() => import('views/interface/plugins/datatables/Datatables')),
      editableRows: lazy(() => import('views/interface/plugins/datatables/EditableRows/EditableRows')),
      editableBoxed: lazy(() => import('views/interface/plugins/datatables/EditableBoxed/EditableBoxed')),
      serverSide: lazy(() => import('views/interface/plugins/datatables/ServerSide/ServerSide')),
      boxedVariations: lazy(() => import('views/interface/plugins/datatables/BoxedVariations/BoxedVariations')),
    },
    lightbox: lazy(() => import('views/interface/plugins/lightbox/Lightbox')),
    maps: lazy(() => import('views/interface/plugins/maps/Maps')),
    notification: lazy(() => import('views/interface/plugins/notification/Notification')),
    players: lazy(() => import('views/interface/plugins/player/Player')),
    progress: lazy(() => import('views/interface/plugins/progress/Progress')),
    scrollbar: lazy(() => import('views/interface/plugins/scrollbar/Scrollbar')),
    shortcuts: lazy(() => import('views/interface/plugins/shortcut/Shortcut')),
    sortable: lazy(() => import('views/interface/plugins/sortable/Sortable')),
  },
  content: {
    index: lazy(() => import('views/interface/content/Content')),
    icons: {
      index: lazy(() => import('views/interface/content/icons/Icons')),
      csLineIcons: lazy(() => import('views/interface/content/icons/CsLineIcons')),
      csInterfaceIcons: lazy(() => import('views/interface/content/icons/CsInterfaceIcons')),
      bootstrapIcons: lazy(() => import('views/interface/content/icons/BootstrapIcons')),
    },
    images: lazy(() => import('views/interface/content/Images')),
    tables: lazy(() => import('views/interface/content/Tables')),
    typography: lazy(() => import('views/interface/content/Typography')),
    menu: {
      index: lazy(() => import('views/interface/content/menu/Menu')),
      horizontal:  lazy(() => import('views/interface/content/menu/Horizontal')),
      vertical: lazy(() => import('views/interface/content/menu/Vertical')),
      verticalHidden: lazy(() => import('views/interface/content/menu/VerticalHidden')),
      verticalNoHidden: lazy(() => import('views/interface/content/menu/VerticalNoHidden')),
      mobileOnly: lazy(() => import('views/interface/content/menu/MobileOnly')),
      sidebar: lazy(() => import('views/interface/content/menu/Sidebar')),
    },
  },
};

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      //to: `${appRoot}/dashboards/analytic`,
      to: `${appRoot}/login`,
    },
    {
      path: `${appRoot}/dashboards/analytic`,
      component: dashboards.analytic,
      label: 'Dashboard',
      icon: 'home',
    },
    {
      path: `${appRoot}/apps`,
      label: 'Uygulamalar',
      icon: 'screen',
      component: apps.index,
      subs: [
        { path: '/calendar', label: 'menu.calendar', component: apps.calendar },
        { path: '/contacts', label: 'menu.contacts', component: apps.contacts },

      ],
    },
    {
      path: `${appRoot}/masraf`,
      label: 'Masraflar',
      icon: 'screen',
      icon: 'home-garage',
      component: masraf.index,
      subs: [
        { path: '/masrafekle', label: 'Masraf Ekle', component: masraf.masrafekle },
        { path: '/masraflistele', label: 'Masraf Listele', component: masraf.masraflistele },
      ],
    },
    {
      path: `${appRoot}/dashboards`,
      component: dashboards.index,
      label: 'Rapor',
      icon: 'home',
       subs: [
        { path: '/default', label: 'Masraf Raporları', component: dashboards.default },
      ],
    },
  ],
  sidebarItems: [
    { path: '#connections', label: 'menu.connections', icon: 'diagram-1', hideInRoute: true },
    { path: '#bookmarks', label: 'menu.bookmarks', icon: 'bookmark', hideInRoute: true },
    { path: '#requests', label: 'menu.requests', icon: 'diagram-2', hideInRoute: true },
    {
      path: '#account',
      label: 'menu.account',
      icon: 'user',
      hideInRoute: true,
      subs: [
        { path: '/settings', label: 'menu.settings', icon: 'gear', hideInRoute: true },
        { path: '/password', label: 'menu.password', icon: 'lock-off', hideInRoute: true },
        { path: '/devices', label: 'menu.devices', icon: 'mobile', hideInRoute: true },
      ],
    },
    {
      path: '#notifications',
      label: 'menu.notifications',
      icon: 'notification',
      hideInRoute: true,
      subs: [
        { path: '/email', label: 'menu.email', icon: 'email', hideInRoute: true },
        { path: '/sms', label: 'menu.sms', icon: 'message', hideInRoute: true },
      ],
    },
    {
      path: '#downloads',
      label: 'menu.downloads',
      icon: 'download',
      hideInRoute: true,
      subs: [
        { path: '/documents', label: 'menu.documents', icon: 'file-text', hideInRoute: true },
        { path: '/images', label: 'menu.images', icon: 'file-image', hideInRoute: true },
        { path: '/videos', label: 'menu.videos', icon: 'file-video', hideInRoute: true },
      ],
    },
  ],
};
export default routesAndMenuItems;
