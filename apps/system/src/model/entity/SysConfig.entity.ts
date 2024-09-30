import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('sys_config', {
  comment: '参数配置表',
})
export class SysConfigEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'config_id', comment: '参数主键' })
  public configId: number;

  @Column({ type: 'varchar', name: 'config_name', length: 100, default: '', comment: '参数名称' })
  public configName: string;

  @Column({ type: 'varchar', name: 'config_key', length: 100, default: '', comment: '参数键名' })
  public configKey: string;

  @Column({ type: 'varchar', name: 'config_value', length: 500, default: '', comment: '参数键值' })
  public configValue: string;

  //系统内置（Y是 N否）
  @Column({ type: 'char', name: 'config_type', length: 1, default: 'N', comment: '系统内置' })
  public configType: string;

  @ApiProperty({ type: String, description: '创建者' })
  @Column({ type: 'varchar', name: 'create_by', length: 64, default: '', comment: '创建者' })
  public createBy: string;

  @ApiProperty({ type: Date, description: '创建时间' })
  @Column({ type: 'datetime', name: 'create_time', default: null, comment: '创建时间' })
  public createTime: Date;

  @ApiProperty({ type: String, description: '更新者' })
  @Column({ type: 'varchar', name: 'update_by', length: 64, default: '', comment: '更新者' })
  public updateBy: string;

  @ApiProperty({ type: Date, description: '更新时间' })
  @Column({ type: 'datetime', name: 'update_time', default: null, comment: '更新时间' })
  public updateTime: Date;

  @ApiProperty({ type: String, description: '备注' })
  @Column({ type: 'varchar', name: 'remark', length: 500, default: null, comment: '备注' })
  public remark: string;
}
