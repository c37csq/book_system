import Vue from 'vue'
import { Switch, Upload, InputNumber, Select, Option, Dialog, MessageBox, TableColumn, BreadcrumbItem, Breadcrumb, Form, FormItem, Input, Button, Message, Header, Container, Aside, Main, Menu, Submenu, MenuItem, Card, Table } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Main)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Menu)
Vue.use(Card)
Vue.use(Table)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(Select)
Vue.use(InputNumber)
Vue.use(Upload)
Vue.use(Switch)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
