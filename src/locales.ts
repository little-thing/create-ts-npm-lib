import {osLocale} from 'os-locale';

interface Messages {
  cliStarting: string;
  downloading: string;
  projectCreated: string;
  nextSteps: string;
  error: string;
  prompts: {
    projectName: {
      message: string;
      errors: {
        empty: string;
        invalid: string;
      };
    };
    description: {
      message: string;
      initial: string;
    };
    author: {
      message: string;
    };
    version: {
      message: string;
    };
    license: {
      message: string;
    };
  };
  errors: {
    dirExists: string;
    templateDownloadFailed: string;
  };
  targetDirectory: string;
}

const en: Messages = {
  cliStarting: 'CLI Starting...',
  downloading: 'Downloading template...',
  projectCreated: '\n✨ Project created successfully!\n',
  nextSteps: 'Next steps:\n',
  error: 'Error: ',
  prompts: {
    projectName: {
      message: 'Enter project name:',
      errors: {
        empty: 'Project name cannot be empty',
        invalid: 'Project name can only contain lowercase letters, numbers and hyphens'
      }
    },
    description: {
      message: 'Enter project description:',
      initial: 'A TypeScript NPM package'
    },
    author: {
      message: 'Enter author name:'
    },
    version: {
      message: 'Enter initial version:',
    },
    license: {
      message: 'Enter license type:'
    }
  },
  errors: {
    dirExists: 'Directory already exists',
    templateDownloadFailed: 'Template download failed: package.json not found'
  },
  targetDirectory: 'Target directory:'
};

const zh: Messages = {
  cliStarting: 'CLI 开始执行...',
  downloading: '正在下载模板...',
  projectCreated: '\n✨ 项目创建成功！\n',
  nextSteps: '接下来你可以：\n',
  error: '错误：',
  prompts: {
    projectName: {
      message: '请输入项目名称:',
      errors: {
        empty: '项目名称不能为空',
        invalid: '项目名称只能包含小写字母、数字和连字符'
      }
    },
    description: {
      message: '请输入项目描述:',
      initial: '一个 TypeScript NPM 包'
    },
    author: {
      message: '请输入作者名称:'
    },
    version: {
      message: '请输入初始版本号:'
    },
    license: {
      message: '请输入许可证类型:'
    }
  },
  errors: {
    dirExists: '目录已存在',
    templateDownloadFailed: '模板下载失败：未找到 package.json'
  },
  targetDirectory: '目标目录路径:'
};

// 获取系统语言
const getSystemLocale = (): Promise<string> => {
  return  osLocale()
};

// 判断是否为中文环境
const isChinese =async (): Promise<boolean> => {
  const locale = await getSystemLocale();
  // 匹配所有可能的中文区域设置
  return locale.startsWith('zh') ||
         locale.includes('chinese') ||
         locale.includes('-cn') ||
         locale.includes('_cn') ||
         locale.includes('-tw') ||
         locale.includes('_tw') ||
         locale.includes('-hk') ||
         locale.includes('_hk');
};

// 导出消息
export const messages: Messages = await isChinese() ? zh : en;
