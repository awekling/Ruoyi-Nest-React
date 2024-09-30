import React from 'react';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from "@umijs/max";
import { ProForm, ProFormText } from '@ant-design/pro-components';

export type FormValueType = any & Partial<API.System.User>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  open: boolean;
  values: Partial<API.System.User>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const loginPassword = Form.useWatch('password', form);
  const userId = props.values.userId;

  const intl = useIntl();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
  };
  const handleFinish = async (values: Record<string, any>) => {
    props.onSubmit({ ...values, userId } as FormValueType);
  };

  const checkPassword = (rule: any, value: string) => {
    if (value === loginPassword) {
      // 校验条件自定义
      return Promise.resolve();
    }
    return Promise.reject(new Error(intl.formatMessage({id:"system.user.password_different",defaultMessage:"两次密码输入不一致"})));
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.user.reset.password',
        defaultMessage: '密码重置',
      })}
      open={props.open}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ProForm
        grid={true}
        form={form}
        layout="horizontal"
        onFinish={handleFinish}
        submitter={false}
        initialValues={{
          password: '',
          confirm_password: '',
        }}
      >
        <p><FormattedMessage id="system.user.password.remind_content" defaultMessage="请输入用户新密码" values={{content:props.values.userName}} /></p>
        <ProFormText.Password
          name="password"
          label={intl.formatMessage({id:"system.user.login_password"
            ,defaultMessage:"登录密码"})}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id:"enum.form.validate.required"
                ,defaultMessage:"不能为空"}),
            },
          ]}
        />
        <ProFormText.Password
          name="confirm_password"
          label={intl.formatMessage({id:"system.user.confirm_password"
            ,defaultMessage:"确认密码"})}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id:"enum.form.validate.required"
                ,defaultMessage:"不能为空"}),
            },
            { validator: checkPassword },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
