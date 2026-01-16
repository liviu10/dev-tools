import type { DrfCheatSheetItem } from './types';

export const serializerItems: DrfCheatSheetItem[] = [
  {
    name: 'serializers.Serializer',
    description: 'The base serializer class. Allows you to define fields manually. Useful for non-model data or when you need full control over the serialization process.',
    example: `class CommentSerializer(serializers.Serializer):\n    email = serializers.EmailField()\n    content = serializers.CharField(max_length=200)\n    created = serializers.DateTimeField()`,
    category: 'Serializers',
  },
  {
    name: 'serializers.ModelSerializer',
    description: 'A serializer that automatically generates a set of fields and validators based on a Django model. The `Meta` class is used to specify the model and fields.',
    example: `class AccountSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Account\n        fields = ['id', 'account_name', 'users', 'created']\n        # Use '__all__' to include all model fields.`,
    category: 'Serializers',
  },
  {
    name: 'HyperlinkedModelSerializer',
    description: 'Similar to `ModelSerializer` but represents relationships using hyperlinks (`url` field) instead of primary keys. Requires a `request` object in the serializer context.',
    example: `class AccountSerializer(serializers.HyperlinkedModelSerializer):\n    class Meta:\n        model = Account\n        fields = ['url', 'id', 'account_name', 'users']`,
    category: 'Serializers',
  },
  {
    name: 'Serializer Fields',
    description: 'Common field types used to define the representation of your data, such as strings, numbers, booleans, dates, etc.',
    example: `name = serializers.CharField(max_length=100)\nscore = serializers.IntegerField()\nis_active = serializers.BooleanField(default=True)\nemail = serializers.EmailField()\nregistration_date = serializers.DateTimeField(read_only=True)`,
    category: 'Serializers',
  },
  {
    name: 'Field Arguments (read_only, write_only, source)',
    description: '`read_only`: included in output, but not accepted for input. `write_only`: accepted for input, but not included in output (e.g., passwords). `source`: specifies which attribute to use for the field\'s value.',
    example: `password = serializers.CharField(write_only=True)\npin_code = serializers.CharField(source='user.pin_code')`,
    category: 'Serializers',
  },
  {
    name: 'SerializerMethodField',
    description: 'A read-only field that gets its value by calling a method on the serializer class. The method name should be `get_<field_name>`.',
    example: `class UserSerializer(serializers.ModelSerializer):\n    full_name = serializers.SerializerMethodField()\n\n    def get_full_name(self, obj):\n        return f"{obj.first_name} {obj.last_name}"`,
    category: 'Serializers',
  },
    {
    name: 'SlugRelatedField',
    description: 'A read-write field that represents the target of the relationship by a field on the target. Useful for human-readable representations.',
    example: `class PostSerializer(serializers.ModelSerializer):\n    # Represents the 'tag' relationship using the 'name' field of the Tag model.\n    tags = serializers.SlugRelatedField(\n        many=True,\n        queryset=Tag.objects.all(),\n        slug_field='name'\n     )`,
    category: 'Serializers',
  },
  {
    name: 'Validation',
    description: 'DRF provides multiple ways to add validation: field-level with `validate_<field_name>` methods, object-level with a `validate` method, and reusable validators.',
    example: `def validate_title(self, value):\n    if 'django' not in value.lower():\n        raise serializers.ValidationError("Blog post is not about Django")\n    return value\n\ndef validate(self, data):\n    if data['start_date'] > data['end_date']:\n        raise serializers.ValidationError("Finish must occur after start")\n    return data`,
    category: 'Serializers',
  },
  {
    name: 'Nested Serializers',
    description: 'Serialize model relationships. You can nest another serializer or use `PrimaryKeyRelatedField`, `SlugRelatedField`, etc.',
    example: `class UserSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = User\n        fields = ['username']\n\nclass PostSerializer(serializers.ModelSerializer):\n    author = UserSerializer(read_only=True)\n    class Meta:\n        model = Post\n        fields = ['title', 'content', 'author']`,
    category: 'Serializers',
  },
  {
    name: 'Custom create() and update()',
    description: 'You can override the `.create()` and `.update()` methods on a serializer to customize how instances are created or modified after validation.',
    example: `class UserSerializer(serializers.ModelSerializer):\n    def create(self, validated_data):\n        user = User.objects.create_user(**validated_data)\n        return user`,
    category: 'Serializers',
  },
    {
    name: 'to_representation() & to_internal_value()',
    description: 'Override `to_representation` to customize the output serialization (object -> dict). Override `to_internal_value` to customize the input deserialization (dict -> object).',
    example: `class CoordsSerializer(serializers.Serializer):\n    def to_representation(self, instance):\n        return f"{instance.lat},{instance.lon}"\n\n    def to_internal_value(self, data):\n        lat, lon = data.split(',')\n        return {'lat': float(lat), 'lon': float(lon)}`,
    category: 'Serializers',
  },
  {
    name: 'Partial Updates (partial=True)',
    description: 'To update a subset of fields on a model instance (i.e., for a PATCH request), pass `partial=True` when instantiating the serializer.',
    example: `serializer = CommentSerializer(instance, data=request.data, partial=True)\nif serializer.is_valid():\n    serializer.save()`,
    category: 'Serializers',
  },
  {
    name: 'Serializing Lists (many=True & ListSerializer)',
    description: 'To serialize a list, pass `many=True`. To customize list-level validation or creation, create a custom `ListSerializer` class.',
    example: `class MyListSerializer(serializers.ListSerializer):\n    def create(self, validated_data):\n        # Custom logic for bulk creation\n        pass\n\nclass MySerializer(serializers.Serializer):\n    class Meta:\n        list_serializer_class = MyListSerializer`,
    category: 'Serializers',
  },
  {
    name: 'Serializer Context',
    description: 'You can pass arbitrary extra context to a serializer by passing a `context` argument. This is useful for including data like the current request object.',
    example: `serializer = MySerializer(data=request.data, context={'request': request})\n\n# Inside serializer:\nself.context['request'].user`,
    category: 'Serializers',
  },
];
